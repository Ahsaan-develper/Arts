import { Router } from "express";
import { verify_token } from "../middleware/jwt.middleware.js";
import { uploadFileMulter } from "../middleware/multer.middleware.js";
import { create_slider, delete_slider, get_all_slider, get_single_slider, update_slider } from "../controller/slider.controller.js";

const slider_router =Router();


// to create a slider 

slider_router.post("/" , verify_token , uploadFileMulter.array("images" , 6) , create_slider);

//get sliders 

slider_router.get("/all" , verify_token , get_all_slider);

// get slider by id 

slider_router.get("/:id", verify_token , get_single_slider);

// update an slider 

slider_router.put("/:id" , verify_token , uploadFileMulter.array("images" , 6) , update_slider);

// delete an slider 

slider_router.delete("/:id" , verify_token , delete_slider);

export default slider_router;