import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema({
   UID : {type : String , required : true , unique : true },
   price : {type : Number  , required  : true , min : 0},
   quantity : {type : Number , min : 1   , required : true },
     event : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Events",
        required : true
    }
} , {timestamps : true});
export default mongoose.model("Ticket", ticketSchema)