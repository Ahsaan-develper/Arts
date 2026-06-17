import { Router } from "express";
import { verify_token } from "../middleware/jwt.middleware.js";
import {
    create_payment,
    get_all_payments,
    get_single_payment,
    update_payment,
    delete_payment
} from "../controller/payment.controller.js";

const payment_router = Router();

payment_router.post("/", verify_token, create_payment);
payment_router.get("/all", verify_token, get_all_payments);
payment_router.get("/:id", verify_token, get_single_payment);
payment_router.put("/:id", verify_token, update_payment);
payment_router.delete("/:id", verify_token, delete_payment);



export default payment_router;