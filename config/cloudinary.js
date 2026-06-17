import fs from "fs";
import {v2 as Cloudinary } from "cloudinary";
import _config from "./config.js";
import { BadRequestError, InternalServerError } from "../middleware/error.middleware.js";


Cloudinary.config({
    cloud_name : _config.cloudinary_name,
    api_key  : _config.cloudinary_key,
    api_secret :  _config.cloudinary_secret_key
});


export const uploadFileCloudinary = async (local_file_path)=>{

    if (!local_file_path){
        throw new BadRequestError("Local path not exist");
    }
    try{

        const response = await Cloudinary.uploader.upload(local_file_path , {
            resource_type :"auto"
        });

        fs.unlinkSync(local_file_path);

        return response.secure_url;
    }catch(err){
        throw new InternalServerError(err.message);

        if (fs.existsSync(local_file_path)){
            fs.unlinkSync(local_file_path)
        };
        return null;
    }
}