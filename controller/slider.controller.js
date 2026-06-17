import { uploadFileCloudinary } from "../config/cloudinary.js";
import { BadRequestError, NotFoundError } from "../middleware/error.middleware.js";
import Slider from "../models/slider.models.js";

// create an slider 

export const create_slider = async (req , res )=>{
    const {title  , admin} = req.body;

    if (!title || !admin ){
        throw new BadRequestError("Please fill all fields");
    }

    if (!req.files || req.files.length === 0){
        throw new BadRequestError("File is missing")
    }


    try{

        const upload_promises = req.files.map(file => uploadFileCloudinary(file.path));

        const upload_images  = await Promise.all(upload_promises);

        const images = upload_images.map ((uri , i )=>({
            img_uri : uri ,
            order  :  i + 1  
        }));

        const new_slider = await Slider.create({
            title ,
            admin,
            images
        });

        res.status(201).json({
            success : true ,
            message : "Slider is created " , 
            data : new_slider,

        })

    }catch(err){
        throw err;
    }
}


// get an slider 

export const get_single_slider = async (req , res )=>{
    const { id }  = req.params;

    if (!id){
        throw new BadRequestError("Id is not given");
    }

    try{

        const slider = await Slider.findById(id);

        if (!slider){
            throw new NotFoundError("Slider not found");
        }

        res.status(200).json({
            success : true ,
            data : slider
        });

    }catch(err){
        throw err;
    }
 }


 // get all sliders 

 export const get_all_slider = async (req , res)=>{
    try{

        const sliders = await Slider.find();

        if (!sliders){
            throw new NotFoundError("No slider found");
        }

        res.status(200).json({
            success : true ,
            data : sliders
        })
        
    }catch(err){
        throw err;
    }
 }


//  update an slider 

export const update_slider = async (req, res) => {
    const { id } = req.params;
    const { title, admin } = req.body; 

    if (!id) {
        throw new BadRequestError("Id not found");
    }


    try {
        const slider = await Slider.findById(id);

        if (!slider) {
            throw new NotFoundError("Slider not found");
        }

        const updateData = {};  

        if (title) updateData.title = title;      
        if (admin) updateData.admin = admin;      

        // Handle new image uploads
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => uploadFileCloudinary(file.path));
            const newImageUris = await Promise.all(uploadPromises);
            
            const existingImages = slider.images || [];  
            
            const newImages = newImageUris.map((uri, index) => ({
                img_uri: uri,
                order: existingImages.length + index + 1
            }));
            
            updateData.images = [...existingImages, ...newImages];  
            
        }

        const updated_slider = await Slider.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Slider updated successfully",
            data: updated_slider
        });

    } catch (err) {
        throw err;
    }
};


// delete a slider 

export const delete_slider = async (req , res)=>{
    const {id} = req.params;

    if (!id){
        throw new BadRequestError("Id not given");
    }

    try{

        const slider = await Slider.findById(id);
        if(!slider){
            throw new NotFoundError("slider not found");
        }   

        // const delete_promises = slider.images.map(img => deleteFromCloudinary(img.img_uri) );
        
        // await Promise.all(delete_promises);

        await Slider.findByIdAndDelete(id);

        res.status(200).json({
            success : true,
            message : "Slider is deleted"
        })

    }catch (err){
        throw err;
    }
}
