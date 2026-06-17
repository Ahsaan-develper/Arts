import { generate_access_token, generate_refresh_token } from "../middleware/jwt.middleware.js";
import { BadRequestError, ConflictError, InternalServerError, NotFoundError } from "../middleware/error.middleware.js";
import User from "../models/user.models.js"
import bcrypt from "bcrypt"


// user sign up 
export const user_signup = async (req , res)=>{
    const { name , email , password } = req.body ;
    if (!name || !email || !password ){
        throw new BadRequestError("Please fill all fields.");
       
    }

   try {
     const user = await User.findOne({email});

    if (user){
        throw new ConflictError("Email already exist");
       
    }

    const hashed_password =await bcrypt.hash(password , 10);

    const new_user = await User.create({
        name ,
        email ,
        password : hashed_password
    });

    const access_token = generate_access_token(new_user._id);
    const refresh_token = generate_refresh_token(new_user._id);

    new_user.refresh_token = refresh_token;

    res.cookie( "refreshToken", refresh_token,{
        httpOnly : true,
        maxAge : 7 * 24 * 60* 60 *  1000
    });

    await new_user.save();

    res.status(201).json({access_token : access_token , data : new_user});
   }catch (err){
       throw new InternalServerError(err);
     
   }

}

// user login 

export const user_login = async (req , res )=>{
    const {email , password }  = req.body;

    if (!email || !password){
        throw new BadRequestError("PLease fill all fields ");
   
    }

   try {
     const user = await User.findOne({email});
    if (!user){
        throw new NotFoundError("User not found ");
        
    }

    const isMatch = await bcrypt.compare(password , user.password);

    if (!isMatch){
        throw new NotFoundError("Password not match");
       
    }

    const access_token = generate_access_token(user._id);
    const refresh_token = generate_refresh_token(user._id);

    user.refresh_token= refresh_token;

    res.cookie("refreshToken", refresh_token, {
        httpOnly : true ,
        maxAge : 7 * 24 * 60 * 60 * 1000
    });

    await user.save();
    res.status(200).json({access_token : access_token , data : user});
   }catch (err){
        throw new InternalServerError(err);
     
   }
}


// for update a user 

export const update_user = async (req , res )=>{
      const {name , email , password } = req.body;
    
        if (!name || !email || !password){
            throw new BadRequestError("Please fill all fields");
          
        }
        
        try {

            const user = await User.findOne({email});

            if (!user){
                throw new BadRequestError("User not found");
                
            }

            const hashed_password = await bcrypt.hash(password , 10);

            const updated_user= await User.findByIdAndUpdate({_id : user._id}, {name , email , password : hashed_password} );

            res.json({ message :"The user is update " , data: updated_user})

        }catch(err){
            throw new InternalServerError(err);
      
        }
}


// for delete a user

export const delete_user = async(req , res)=>{
    const userId = req.userId;

       if (!userId) {
        throw new BadRequestError("User ID not found in token");
    }

    const user = await User.findById(userId);

    if(!user){
        throw new NotFoundError("User not found");
       
    }

    await User.findByIdAndDelete(userId);

    res.json({message :"User is deleted"});
}
