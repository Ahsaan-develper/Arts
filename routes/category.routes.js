import { Router } from "express";
import { add_category, delete_category, get_all_categories, update_category } from "../controller/category.controller.js";


const category_router = Router();

// create an category 

category_router.post("/"  , add_category);


// get all categories 

category_router.get("/"  , get_all_categories);

// update an category 

category_router.put("/" , update_category);

//delete an category


category_router.delete("/" , delete_category);


export default category_router;