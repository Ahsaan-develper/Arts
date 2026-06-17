import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
     name : {type : String},
    email : {type : String},
    password : {type : String},
    refresh_token : {type :String , default : null}
} , {timestamps : true});

export default mongoose.model("User", userSchema);