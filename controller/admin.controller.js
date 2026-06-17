
import { BadRequestError, ConflictError, NotFoundError } from "../middleware/error.middleware.js";
import Admin from "../models/admin.models.js"
import bcrypt from "bcrypt";
import { generate_access_token, generate_refresh_token } from "../middleware/jwt.middleware.js";
import userModel from "../models/user.models.js";



// for admin signup 


export const signup_admin = async (req , res ) =>{
    const {name , email , password } = req.body ;
    
    if (!name || !email || ! password){
      throw new BadRequestError("Name , email or password is not fill"); 
    }

    const admin = await Admin.findOne({email});

    if(admin){
        throw new ConflictError("User already exist with this email");
    } 

    const hashed_password = await bcrypt.hash(password , 10);

    const new_admin = await Admin.create({
        name ,
        email ,
        password : hashed_password
    });

    const access_token = generate_access_token(new_admin._id);
    const refresh_token = generate_refresh_token(new_admin._id);
    
    new_admin.refresh_token = refresh_token;
    await new_admin.save();
    res.cookie("refreshToken", refresh_token, {
        httpOnly : true,
        maxAge : 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({access_token : access_token , data : new_admin});
}



// login an admin 

export const admin_login = async(req , res , next)=>{
    const {email , password} = req.body ;

    if (!email || !password){
        throw new BadRequestError("All feilds are not fill");
        return ;
    }

    const admin = await Admin.findOne ({email});
    if(!email ){
        throw new NotFoundError("User not found ");
        return;
    }

    const isMatch = await bcrypt.compare(password , admin.password);

    if (!isMatch){
        throw new NotFoundError("Password not match ");
        return;
    }

    const access_token = generate_access_token(admin._id);
    const refresh_token = generate_refresh_token(admin._id);

    admin.refresh_token = refresh_token;

    res.cookie("refreshToken" , refresh_token , {
        httpOnly: true,
        maxAge : 7 * 24 * 60 * 60 * 1000
    });

    await admin.save();

    res.json({access_token : access_token , data : admin});
 }




