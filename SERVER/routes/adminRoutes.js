import express from "express";
import { fetchUserController, loginController, logoutController, signUpController } from "../controller/adminController.js";
import { requiredSignin } from "../middleware/Auth.js";

const router = express.Router();


router.post("/sign-up", signUpController)

router.post("/login",loginController )

router.post("/logout", logoutController)

router.get("/get-user", requiredSignin,fetchUserController)


export default router;