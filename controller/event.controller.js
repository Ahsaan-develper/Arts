import { uploadFileCloudinary } from "../config/cloudinary.js";
import { BadRequestError, NotFoundError } from "../middleware/error.middleware.js";
import Event from "../models/events.models.js";



// create an event 

export const create_event = async (req , res)=>{
    const {   title ,
        description,
        start_date,
        end_date ,
        location,
         country}  = req.body;


         if (!title || !description || !start_date || !end_date || !location  || !country){
            throw new BadRequestError("Please fill all fields ");
         }

         if (!req.file ){
            throw new BadRequestError("img is not given");
         }

        try {

            const img_uri = await uploadFileCloudinary(req.file.path);
            const event = await Event.create({
                 title ,
        description,
        start_date,
        end_date ,
        location,
        img  : img_uri,
         country
            });

            res.status(201).json({
                success : true,
                data : event,  
            })

        }catch(err){
            throw err;
        }
    }


//  for get an event 

export const get_single_event = async (req , res)=>{
    const {id } = req.params;

    if (!id){
        throw new BadRequestError("Id of event not given");
    }

    try{

        const event = await Event.findById(id);

        if (!event){
            throw new NotFoundError("Event not found ");
        }

        res.status(200).json({
            success : true,
            data  : event
        })
        
    }catch (err){
        throw err;
    }
}


//  for all events 

export const get_all_event = async (req , res)=>{
    

    try{

        const event = await Event.find();

        if (!event){
            throw new NotFoundError("Events not found ");
        }

        res.status(200).json({
            success : true,
            data  : event
        })
        
    }catch (err){
        throw err;
    }
}


// update an event 

export const update_event = async (req , res)=>{
    const { id } = req.params ;
    const {title , description , start_date , end_date , location , country} = req.body;
    if (!title || !description || !start_date || !end_date || !location || !country){
        throw new BadRequestError("All fields are not fill");
    }

    if (!id ){
        throw new BadRequestError("Id not given ");
    }

    try{

        const event = await Event.findById(id);
        if(!event){
            throw new NotFoundError("Event not found ");
        }

        const  update_data = {};

        if(title) update_data.title = title ;
        if(title) update_data.description = description ;
        if(title) update_data.start_date = start_date ;
        if(title) update_data.end_date = end_date ;
        if(title) update_data.location = location ;
        if(title) update_data.country = country ;

        if (!req.file ){
            const imgURI = await   uploadFileCloudinary(req.file.path);
            update_data.img = imgURI
        }



        const updated_event = await Event.findByIdAndUpdate(id , {update_data} , {new : true , runValidators : true});

         res.status(200).json({
            success : true ,
            message : "Event is update",
            data : updated_event,
          
         });

    }catch(err){
        throw err;
    }
}



//   for delete an event 

export const delete_event = async (req , res)=>{
    const {id} = req.params;

    if (!id){
        throw new BadRequestError("Id not given");
    }

    try{

        const event = await Event.findById(id);
        if(!event){
            throw new NotFoundError("Event not found");
        }

        await Event.findByIdAndDelete(id);

        res.status(200).json({
            success : true,
            message : "Event is deleted"
        })

    }catch (err){
        throw err;
    }
}
