import { Router } from "express";
import { verify_token } from "../middleware/jwt.middleware.js";
import {
    create_ticket,
    get_all_tickets,
    get_single_ticket,
    update_ticket,
    delete_ticket
} from "../controller/ticket.controller.js";

const ticket_router = Router();

ticket_router.post("/", verify_token, create_ticket);
ticket_router.get("/all", verify_token, get_all_tickets);
ticket_router.get("/:id", verify_token, get_single_ticket);
ticket_router.put("/:id", verify_token, update_ticket);
ticket_router.delete("/:id", verify_token, delete_ticket);

export default ticket_router;