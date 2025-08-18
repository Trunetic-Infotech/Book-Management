import dotenv from "dotenv";
import cloudinary from "../util/Cloudinary.js";
import books from "../config/DB.js";
import book_payments from "../config/DB.js";
import util from "util";
import axios from "axios";

export const addBookController = async (req, res) => {
  try {
    if (!req.files || !req.files.thumbnailImageFile || !req.files.bookPdfFile) {
      return res
        .status(400)
        .json({ message: "Both thumbnail and book PDF are required." });
    }

    

    const thumbnailUrl = req.files.thumbnailImageFile[0].path;
    const pdfUrl = req.files.bookPdfFile[0].path;

    const {
      bookId,
      title,
      author,
      publisher,
      isbn,
      edition,
      subject,
      classLevel,
      language,
      price,
      uploadDate,
      description,
    } = req.body;

    const admin_id = req.userID.id;

    const priceNum = parseFloat(price);
if (isNaN(priceNum)) {
  throw new Error("Invalid price");
}
// use priceNum in your params


    const sql = `INSERT INTO books 
      (bookId, title, author, publisher, isbn, edition, subject, classLevel, language, price, uploadDate, description, admin_id, thumbnailImageUrl, downloadLink)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      bookId,
      title,
      author,
      publisher,
      isbn,
      edition,
      subject,
      classLevel,
      language,
      price,
      uploadDate,
      description,
      admin_id,
      thumbnailUrl,
      pdfUrl,
    ];
    console.log("SQL Params:", params);


    const [result] = await books.execute(sql, params);

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: {
        id: result.insertId,
        bookId,
        title,
        author,
        publisher,
        isbn,
        edition,
        subject,
        classLevel,
        language,
        price,
        uploadDate,
        description,
        admin_id,
        thumbnailImageUrl: thumbnailUrl,
        downloadLink: pdfUrl,
      },
    });
  } catch (error) {
 console.error("Error adding book:", error);

  if (error.code === "ER_DUP_ENTRY") {
    return res.status(400).json({
      success: false,
      message: `Duplicate entry: A book with ID '${req.body.bookId}' already exists.`,
    });
  }

  res.status(500).json({
    success: false,
    message: error.message || "Something went wrong",
  });

}
};


export const fetchAllBooks = async (req, res) => {
  try {
    const admin_id = req.userID?.id; // from auth middleware
    const { page = 1, limit = 20, all = false } = req.query;

    const offset = (page - 1) * limit;

    // Build query
    let query = `SELECT * FROM books`;
    const params = [];

    if (!all && admin_id) {
      query += ` WHERE admin_id = ?`;
      params.push(admin_id);
    }

    query += ` ORDER BY uploadDate DESC LIMIT ${Number(limit)} OFFSET ${Number(offset)}`;


    // Fetch books
    const [rows] = await books.execute(query, params);

    // Count total for pagination
    let countQuery = `SELECT COUNT(*) as total FROM books`;
    let countParams = [];
    if (!all && admin_id) {
      countQuery += ` WHERE admin_id = ?`;
      countParams.push(admin_id);
    }
    const [countResult] = await books.execute(countQuery, countParams);
    const total = countResult[0]?.total || 0;

    return res.status(200).json({
      success: true,
      page: Number(page),
      limit: Number(limit),
      total,
      data: rows
    });

  } catch (error) {
    console.error("Error fetching books:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};




const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  try {
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex === -1) return null;

    let publicIdWithVersionAndExt = url.substring(uploadIndex + 8);

    // Remove version like v123456/
    publicIdWithVersionAndExt = publicIdWithVersionAndExt.replace(/^v\d+\//, "");

    publicIdWithVersionAndExt = decodeURIComponent(publicIdWithVersionAndExt);

    // Remove common file extensions for pdf, images
    publicIdWithVersionAndExt = publicIdWithVersionAndExt.replace(/\.(pdf|png|jpg|jpeg|gif)$/i, "");

    // Replace spaces with underscores (Cloudinary uses underscores internally)
    publicIdWithVersionAndExt = publicIdWithVersionAndExt.replace(/ /g, "_");

    // Trim any trailing dots or slashes
    publicIdWithVersionAndExt = publicIdWithVersionAndExt.trim().replace(/[./\\]+$/, "");

    return publicIdWithVersionAndExt;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};



export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ success: false, message: "Book ID is required" });

    // Fetch book URLs
    const [rows] = await books.execute(
      "SELECT downloadLink, thumbnailImageUrl FROM books WHERE id = ?",
      [id]
    );

    if (!rows.length)
      return res.status(404).json({ success: false, message: "Book not found" });

    const book = rows[0];

    // Extract public IDs
    const downloadLinkPublicId = getPublicIdFromUrl(book.downloadLink);
    const thumbnailPublicId = getPublicIdFromUrl(book.thumbnailImageUrl);

    console.log("Original downloadLink URL:", book.downloadLink);
    console.log("Extracted downloadLink Public ID:", downloadLinkPublicId);
    console.log("Original thumbnailImageUrl URL:", book.thumbnailImageUrl);
    console.log("Extracted thumbnail Public ID:", thumbnailPublicId);

    // Delete downloadLink file (try with resource_type 'raw' and fallback)
    if (downloadLinkPublicId) {
      try {
        const resultRaw = await cloudinary.uploader.destroy(downloadLinkPublicId, { resource_type: "raw" });
        console.log("Cloudinary raw delete result:", resultRaw);
        if (resultRaw.result === "not found") {
          const resultRawFallback = await cloudinary.uploader.destroy(downloadLinkPublicId);
          console.log("Cloudinary raw delete fallback result:", resultRawFallback);
        }
      } catch (err) {
        console.error("Error deleting raw file:", err);
      }
    }

    // Delete thumbnail file (try with resource_type 'image' and fallback)
    if (thumbnailPublicId) {
      try {
        const resultImg = await cloudinary.uploader.destroy(thumbnailPublicId, { resource_type: "image" });
        console.log("Cloudinary image delete result:", resultImg);
        if (resultImg.result === "not found") {
          const resultImgFallback = await cloudinary.uploader.destroy(thumbnailPublicId);
          console.log("Cloudinary image delete fallback result:", resultImgFallback);
        }
      } catch (err) {
        console.error("Error deleting image file:", err);
      }
    }

    // Delete book record from DB
    const [result] = await books.execute("DELETE FROM books WHERE id = ?", [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: "Book not found" });

    res.status(200).json({ success: true, message: "Book and files deleted successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
};
// async function testDelete() {
//   const publicId = "Thumbnails/Class_10_Science_Thumbnail-1754976519146"; // paste exact ID here
//   try {
//     const result = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
//     console.log("Delete result:", result);
//   } catch (err) {
//     console.error("Delete error:", err);
//   }
// }
// testDelete();

// const testDeletePdf = async (publicId) => {
//   try {
//     console.log("Trying to delete PDF with public ID:", publicId);
//     const result = await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
//     console.log("Delete result:", result);
//   } catch (error) {
//     console.error("Error deleting PDF:", error);
//   }
// };

// // Example usage — replace with your extracted public ID
// testDeletePdf("books/Maths_textbook_Class10-1754911859895");





export const updateBook = async (req, res) => {
  try {
    const { id } = req.params; // Book's database ID
    const { title, price } = req.body; // Only the fields you want to update
    console.log(req.body);
    
    // Validate
    if (!title || !price) {
      return res.status(400).json({ message: "Title and price are required" });
    }

    const query = `UPDATE books SET title = ?, price = ? WHERE id = ?`;
    const [result] = await books.execute(query, [title, price, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({success: true, message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Server error", error });
  }
};





export const fetchAllBooksForSchool = async (req, res) => {
  try {
    // Extract pagination params from query string
    let { page = 1, limit = 10 } = req.query;

    // Convert to numbers and ensure valid values
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const offset = (page - 1) * limit;

    // Count total books for pagination info
    const [countResult] = await books.execute(`SELECT COUNT(*) AS total FROM books`);
    const totalBooks = countResult[0].total;
    const totalPages = Math.ceil(totalBooks / limit);

    // Fetch paginated data
    const query = `
      SELECT 
      id,
        bookId, 
        title, 
        author, 
        publisher, 
        isbn, 
        edition, 
        subject, 
        classLevel, 
        language, 
        price, 
        description, 
        thumbnailImageUrl 
      FROM books
      LIMIT ${limit} OFFSET ${offset}
    `;

    const [rows] = await books.execute(query);

    return res.status(200).json({
      success: true,
      page,
      limit,
      totalPages,
      totalBooks,
      books: rows
    });

  } catch (error) {
    console.error("Error fetching books for school:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching books",
      error: error.message
    });
  }
};


export const homePageDataController = async (req, res) => {
  try {
    // total counts
    const [[{ totalBooks }]] = await books.execute(`SELECT COUNT(*) AS totalBooks FROM books`);
    const [[{ totalSoldBooks }]] = await book_payments.execute(`SELECT COUNT(*) AS totalSoldBooks FROM book_payments`);
    const [[{ totalSales }]] = await book_payments.execute(`SELECT IFNULL(SUM(price), 0) AS totalSales FROM book_payments`);

    const [recentActivity] = await book_payments.execute(`
      (
        SELECT 
          'New Book Added' AS activity_type,
          b.title,
          b.author,
          b.isbn,
          b.thumbnailImageUrl,
          b.created_at AS activity_date,
          b.admin_id
        FROM books b
      )
      UNION ALL
      (
        SELECT
          'Transaction Completed' AS activity_type,
          b.title,
          b.author,
          b.isbn,
          b.thumbnailImageUrl,
          bp.transaction_date AS activity_date,
          bp.admin_id
        FROM book_payments bp
        LEFT JOIN books b ON bp.book_id = b.id
      )
      ORDER BY activity_date DESC
      LIMIT 5
    `);

    // Loop through activities and fetch admin name for Transaction Completed
for (const activity of recentActivity) {
  if (activity.activity_type === "Transaction Completed" && activity.admin_id) {
    try {
      const adminResponse = await axios.get(
        `${process.env.VITE_URL}/admin/get-school-name/${activity.admin_id}`
      );
      activity.admin_name = adminResponse.data?.name
      
      || "Unknown Admin";
    } catch (error) {
      console.error(`Error fetching admin name for ID ${activity.admin_id}:`, error.message);
      activity.admin_name = "Unknown Admin";
    }
  }
}

// console.log(recentActivity);

//     console.log(totalBooks, totalSoldBooks, totalSales);

const [salesAndRevenue] =  await book_payments.execute(`SELECT 
    DATE_FORMAT(transaction_date, '%Y-%m') AS month, -- Format as YYYY-MM
    COUNT(*) AS total_sales,
    SUM(price) AS total_revenue
FROM book_payments
WHERE payment_status = 'success'
GROUP BY DATE_FORMAT(transaction_date, '%Y-%m')
ORDER BY month;
`)


console.log(salesAndRevenue);

   
    
    

    res.json({
      success: true,
      totalBooks,
      totalSoldBooks,
      totalSales,
      recentActivity,
      salesAndRevenue,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


