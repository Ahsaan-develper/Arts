import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
    title : {type : String},
    description: {type : String},
    start_date : {type : Date},
    end_date : {type : Date},
    location : {type : String},
    img : {type : String},
     country : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "country",
        required : true
    }
} , {timestamps : true});
export default mongoose.model("Events", eventSchema)