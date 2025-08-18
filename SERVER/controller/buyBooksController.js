import dotenv from "dotenv";
import books from "../config/DB.js";
import book_payments from "../config/DB.js";
import { instance } from "../services/razorpay.js";
import crypto from "crypto";
import axios from "axios";
import dayjs from "dayjs"; 

dotenv.config();

export const createOrder = async (req, res) => {
  try {
    const { bookId, price, admin_id } = req.body;

    // console.log(bookId, price, admin_id);
    // console.log(req.body);

    const orderOptions = {
      amount: price * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `order_rcptid_${Math.random()}`,
      notes: {
        purchase_details: req.body, // Store user data (optional)
      },
    };

    const order = await instance.orders.create(orderOptions);

    res.json({
      success: true,
      order_id: order.id,
      price,
      bookId,
      admin_id,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
    });
  }
};

export const verifyPaymentController = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      admin_id,
      bookId,
      price,
    } = req.body;

    // ✅ 1. Verify Razorpay signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_APT_SECRET_TEST);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // ✅ 2. Fetch payment details from Razorpay API
    const paymentDetailsFromRazorpay = await instance.payments.fetch(razorpay_payment_id);
    const currency = paymentDetailsFromRazorpay.currency;
    const payment_method = paymentDetailsFromRazorpay.method;
    const receipt_id = paymentDetailsFromRazorpay.receipt || null;
    const receipt_url = paymentDetailsFromRazorpay.notes?.receipt_url || null;

    // ✅ 3. Save payment in DB
    const insertQuery = `
      INSERT INTO book_payments (
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        receipt_id,
        receipt_url,
        payment_status,
        amount_paid,
        currency,
        payment_method,
        admin_id,
        book_id,
        price,
        transaction_date,
        payment_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
    `;

    await book_payments.execute(insertQuery, [
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      receipt_id,
      receipt_url,
      "SUCCESS",
      price,
      currency,
      payment_method,
      admin_id,
      bookId,
      price,
      "book_purchase"
    ]);

    // ✅ 4. Try adding book to school library
    await addBookToSchoolLibrary(admin_id, bookId);

    // ✅ 5. Send success response
    res.json({
      success: true,
      message: "Payment verified and EBOOK added to the library."
    });

  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};


export const addBookToSchoolLibrary = async (admin_id, bookId) => {
  try {
    // 1️⃣ Get e-book details from Book Management DB
    const query = `
      SELECT title, author, publisher, isbn, edition, subject, classLevel, language, price, 
             NOW() AS purchase_date, downloadLink, thumbnailImageUrl, description
      FROM books WHERE id = ?
    `;
    const [book] = await books.execute(query, [bookId]);

    if (!book || book.length === 0) {
      throw new Error("Book not found in Book Management DB");
    }
    
const formattedPurchaseDate = dayjs().format("YYYY-MM-DD HH:mm:ss");

    const bookData = {
      ...book[0],
      admin_id,
      book_management_id: bookId,
      purchase_date: formattedPurchaseDate
    };

    // 2️⃣ Send book data to School Management backend
    const response = await axios.post(
      `${process.env.VITE_URL}/library/add-e-book`,
      bookData
    );

    console.log("✅ E-book added to school library:", response.data);

  } catch (error) {
    console.error("❌ Error adding e-book to school library:", error.message);
    throw error; // 🔴 Pass the error up so verifyPaymentController knows
  }
};


export const paymentDetailsController = async(req,res)=>{
    try {
        const [paymentDetails] = await book_payments.execute(`Select bp.*, b.title, b.author from book_payments bp LEFT JOIN books b on bp.book_id = b.id order by bp.transaction_date DESC `);

           if (!paymentDetails.length) {
      return res.status(404).json({ success: false, message: "No payments found" });
    }

      // 2️⃣ Fetch admin names for each payment
    const paymentsWithAdminNames = await Promise.all(
      paymentDetails.map(async (payment) => {
        try {
          const adminResponse = await axios.get(
            `${process.env.VITE_URL}/admin/get-school-name/${payment.admin_id}`
          );

          return {
            ...payment,
            admin_name: adminResponse.data?.name || "Unknown Admin"
          };
        } catch (error) {
          console.error(`❌ Error fetching admin for ID ${payment.admin_id}:`, error.message);
          return {
            ...payment,
            admin_name: "Unknown Admin"
          };
        }
      })
    );

    console.log(paymentsWithAdminNames);
    

    // 3️⃣ Send final response
    res.json({
      success: true,
      total: paymentsWithAdminNames.length,
      data: paymentsWithAdminNames
    });
    } catch (error) {
        console.error("❌ Error fetching payments:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching payments"
    });
    }
}


export const getPaymentDetailsForSchoolController = async(req,res)=>{
  try {
    const {id} = req.params;

    const query = "Select bp.*, b.title, b.author, b.isbn, b.thumbnailImageUrl from book_payments bp LEFT JOIN books b on bp.book_id = b.id where bp.admin_id = ?  order by bp.transaction_date DESC";

    const [rows] = await book_payments.execute(query, [id]);

    if(rows.length === 0){
      return res.status(404).json({
        success: false,
        message: "No Payment Data found for your school!"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Payment data Found!",
      data: rows
    })
    
  } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message
        })    
  }
}

