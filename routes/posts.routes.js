import { Router } from "express";
import { category_posts, create_post, delete_post, get_all_posts, get_single_post, update_post } from "../controller/posts.controller.js";
import { verify_token } from "../middleware/jwt.middleware.js";
import { uploadFileMulter } from "../middleware/multer.middleware.js";


const post_router = Router();

// for create a post 

post_router.post("/", verify_token , uploadFileMulter.single("img") , create_post);


// get all posts 

post_router.get("/all" , verify_token , get_all_posts);


// for get a single post 

post_router.get("/:id" , verify_token , get_single_post);



// get post by category \

post_router.get("/category/:slug" , verify_token , category_posts);

// update a post 

post_router.put("/:id"  , verify_token , uploadFileMulter.single("img") ,  update_post);

// delete a post 

post_router.delete("/:id" , verify_token , delete_post)


export default post_router;