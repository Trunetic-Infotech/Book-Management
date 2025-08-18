// index.js
import express from "express";      
import dotenv from "dotenv";       
import morgan from "morgan";        
import cors from "cors";           
import cookieParser from "cookie-parser"; 
import adminRoutes  from "./routes/adminRoutes.js"
import bookRoutes  from "./routes/bookRoutes.js"
import buyBooksRoutes  from "./routes/buyBooksRoutes.js"
// Database Connection 
import connection from "./config/DB.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();


// Middleware


// Parse JSON data in requests
app.use(express.json());

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Enable CORS (allow requests from frontend)
app.use(
  cors({
    origin: [
      "http://192.168.1.33:5100", // school management frontend
      "http://192.168.1.33:5200", // school management frontend
      "http://localhost:5173",     // book management frontend
      "http://localhost:3000"     // book management frontend
    ],
    credentials: true,
  })
);


// Parse cookies
app.use(cookieParser());

// Log HTTP requests (GET, POST, etc.)
app.use(morgan("dev"));


// Basic Routes

app.use("/api/v1/admin", adminRoutes)

app.use("/api/v1/books",bookRoutes)


app.use("/api/v1/buy-book",buyBooksRoutes)


// // Dummy protected route
// app.get("/api/v1/check-token", (req, res) => {
//   const token = req.cookies.token;
//   if (token) {
//     res.json({ success: true, token });
//   } else {
//     res.json({ success: false, message: "No token found in cookies" });
//   }
// });

// Start Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
