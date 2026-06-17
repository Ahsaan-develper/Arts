import { Router } from "express";
import { delete_user, update_user, user_login, user_signup } from "../controller/user.controller.js";
import { verify_token } from "../middleware/jwt.middleware.js";

const user_router = Router();


// user sign up 

user_router.post("/",user_signup);

// user login 

user_router.get("/" , user_login);

// user update 

user_router.put("/", verify_token,update_user);

// delete a user 

user_router.delete("/",verify_token ,  delete_user);

export default user_router;
