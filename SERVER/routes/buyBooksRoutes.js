import express from "express";
import { createOrder, getPaymentDetailsForSchoolController, paymentDetailsController, verifyPaymentController } from "../controller/buyBooksController.js";
import { requiredSignin } from "../middleware/Auth.js";


const router = express.Router();



router.post("/create-order",createOrder);

router.post("/verify-payment", verifyPaymentController)


router.get("/payment-details", requiredSignin,paymentDetailsController)


router.get("/get-purchase-deatils-for-school/:id",getPaymentDetailsForSchoolController)



export default router;
