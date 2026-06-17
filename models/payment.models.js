import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
   amount : {type : Number  , required : true },
   method : {type : String   , required : true  , enum : ["credit_card", "debit_card", "paypal", "stripe", "cash" ]},
   status : {
        type : String ,
        enum : ["pending"  , "completed" , "Failed" , "refunded"],
        default : "pending",
        required : true
   },
     ticket : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Ticket",
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
} , {timestamps : true});
export default mongoose.model("Payment", paymentSchema)