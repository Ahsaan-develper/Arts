import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name : {type : String},
    email : {type : String},
    password : {type : String},
    refresh_token : {type : String , default : null }
} , {timestamps : true});

export default mongoose.model("Admin" , adminSchema );