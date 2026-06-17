import { BadRequestError, ConflictError, NotFoundError } from "../middleware/error.middleware.js";
import Subscriber from "../models/subscriber.models.js";


// make a subscription 

export  const create_subscription = async (req , res)=>{
    const {name , email , status , user} = req.body;

    if (!name || !email || !status || !user){
        throw new BadRequestError("Please fill all fields ");
    }

    try {

        const existing_user = await Subscriber.findOne({email , status});

        if (existing_user && status =="active"){
            throw new ConflictError("User already subscribe ");
        }

        const new_user = await Subscriber.create({
            name , email , status , user
        });


        res.status(201).json({
            success : true ,
            data : new_user
        })

    }catch(err){
        throw err;
    }
}


// get a single Subscriber 


export const get_single_subscriber = async (req , res ) =>{
    const { id } = req.params ;

    if (!id){
        throw new BadRequestError("Id not given");
    }

    try{

        const subscription = await Subscriber.findById(id);

        if (!subscription){
            throw new NotFoundError("Subscription data not found");
        }

        res.status(200).json({
            success : true ,
            data : subscription
        })
    }catch(err){
        throw err;
    }
}


// update an subscription 

export const update_subscription = async (req , res)=>{
       const {name , email , status , user} = req.body;

    if (!name || !email || !status || !user){
        throw new BadRequestError("Please fill all fields ");
    }
    const {id} = req.params;

    if (!id){
        throw new BadRequestError("Id not given");
    }

    try {

        const subscription = await Subscriber.findById(id);

        if(!subscription){
            throw new NotFoundError(" Subscription not found");
        }

        const updated_subscription = await Subscriber.findByIdAndUpdate(id , {name , email , status , user}, {new : true  , runValidators: true });

        res.status(200).json({
            success : true ,
           message :  "Subscription is updated ",
           data : updated_subscription

        })

    }catch(err){
        throw err;
    }
}



// for delete an subscription 

export const delete_subscription = async (req , res )=>{
    const {id} = req.params;

    if (!id){
        throw new BadRequestError("Id not given");
    }

    try {

        const subs = await Subscriber.findById(id);
        if(!subs){
          throw new   NotFoundError(" Subscription not found");
        }

        await Subscriber.findByIdAndDelete(id);

        res.status(200).json({
            success : true ,
            message : "Deleted !!!"
        })

    }catch(err){
        throw err;
    }
}