import mongoose, { Schema } from "mongoose";

const subscriberSchema = new Schema({
    name : {type : String ,  required : true},
    email : {type : String , required : true , unique : true},
    status : {type : String , required : true , enum : [ "unsubscribed" , "active" , "inactive"]   , default : "inactive"},
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
} , {timestamps : true})

export default mongoose.model("Subscriber" , subscriberSchema);