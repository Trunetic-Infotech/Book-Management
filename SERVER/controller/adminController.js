import bcrypt from "bcrypt";
import dotenv from "dotenv";
import admin from "../config/DB.js";
import jwt from "jsonwebtoken";

dotenv.config();

export const signUpController = async (req, res) => {
  try {
    const { username, email, password, full_name } = req.body;

    if (!username || !email || !password || !full_name) {
      return res.status(400).json({
        message: "All fields are required for registration!",
      });
    }

    // ✅ Ensure `password` is a string
    if (typeof password !== "string") {
      return res.status(400).json({ message: "Password must be a string" });
    }

    // ✅ Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    //   Check if email exists

    const [rows] = await admin.execute(`Select * from admin where email = ?`, [
      email,
    ]);

    if (rows.length > 0) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    // Hash passowrd
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user in DB

    const query = `INSERT INTO admin (username, email, password, full_name)
VALUES (?,?,?,?)`;

    const [insertResult] = await admin.execute(query, [
      username,
      email,
      hashedPassword,
      full_name,
    ]);

    const newUserId = insertResult.insertId;

    return res.status(201).json({
      success: true,
      message: "Regirstration Successful!",
      userId: newUserId,
    });
  } catch (error) {
    console.error("Error in registration:", error);

    // Check for MySQL duplicate entry error
    if (error.code === "ER_DUP_ENTRY") {
      // Extract field name from SQL error message
      const match = error.sqlMessage.match(/for key '(.+?)'/);
      const fieldKey = match ? match[1].split(".").pop() : "a unique field";

      return res.status(400).json({
        success: false,
        message: `An account with this ${fieldKey} already exists.`,
      });
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Get user by email
    const [rows] = await admin.execute("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, full_name: user.full_name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // lax for local dev
      maxAge: 24 * 60 * 60 * 1000,
    });

    // ✅ Successful login
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        created_at: user.created_at
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/", // must match the original cookie path
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging out",
    });
  }
};






export const fetchUserController = async(req,res)=>{
  try {
    const id = req.userID.id;
    // console.log(id);

    const [user] = await admin.execute(`Select id, username, email, full_name, created_at from admin where id = ?`,[id])


    // console.log(user);

    if(user.length === 0){
      return res.status(404).json({
        success: false,
        message: "User Not Found!"
      })
    }

    return res.status(200).json({
      success: true,
      message: "User Found",
      user: user
    })
    
        
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error"
    })    
  }
}