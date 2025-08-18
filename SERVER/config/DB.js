import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); 

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 100000,  // Allow multiple connections
  queueLimit: 5000000,
  charset: "utf8mb4", 
}); 

// Test the database connection
(async () => {
  try {
    const [rows] = await connection.execute("SELECT 1");
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connectiona failed:", error);
  }
})();

export default connection;