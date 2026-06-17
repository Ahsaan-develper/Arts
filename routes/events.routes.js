import { Router  } from "express";
import { create_event, delete_event, get_all_event, get_single_event, update_event } from "../controller/event.controller.js";
import { verify_token } from "../middleware/jwt.middleware.js";
import { uploadFileMulter } from "../middleware/multer.middleware.js";

const event_router = Router();


// create an event 

event_router.post("/" ,  verify_token, uploadFileMulter.single("img") , create_event);

// get all event 

event_router.get("/all" , verify_token , get_all_event);

// get single event 

event_router.get("/:id", verify_token , get_single_event);

//update an event 

event_router.put("/:id" , verify_token , uploadFileMulter.single("img") , update_event );

// delete an event 

event_router.delete("/:id" , verify_token , delete_event);

export default event_router;