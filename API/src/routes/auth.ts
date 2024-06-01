import { Router } from "express";
import AuthController from "../controller/authController";

const router=Router();

//login
router.post("/login", AuthController.login);

//register
//router.post("/register", AuthController.register);

//forgot
//router.post("/forgot", AuthController.forgot);

export default router;