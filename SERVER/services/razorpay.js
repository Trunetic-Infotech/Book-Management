import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY_TEST,
    key_secret: process.env.RAZORPAY_APT_SECRET_TEST,
  });