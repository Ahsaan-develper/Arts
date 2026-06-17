import { Router } from "express";
import { create_subscription, delete_subscription, get_single_subscriber, update_subscription } from "../controller/subscriber.controller.js";
import { verify_token } from "../middleware/jwt.middleware.js";

const subscriber_router = Router();

// create an subscriber 

subscriber_router.post("/"  , verify_token , create_subscription);

// get an subscription

subscriber_router.get("/:id" , verify_token , get_single_subscriber);

// update an subscription 

subscriber_router.put("/:id" , verify_token , update_subscription);

// delete an subscription 

subscriber_router.delete("/:id" , verify_token , delete_subscription);


export default subscriber_router;