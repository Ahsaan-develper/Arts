import { Router } from "express";
import { admin_login, signup_admin } from "../controller/admin.controller.js";

const admin_router = Router();

// admin sign up 

admin_router.post("/", signup_admin);

// admin login 

admin_router.get("/", admin_login);

export default admin_router;