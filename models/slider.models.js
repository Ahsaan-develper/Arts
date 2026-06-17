import mongoose, { Schema } from "mongoose";

const sliderSchema = new Schema({
   title : {type : String},
   images : [{
    img_uri :  {type : String , required : true },
    order: {type: Number  , default  : 0 }
   }],
    admin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Admin",
        required : true
    }
} , {timestamps : true});
export default mongoose.model("Slider", sliderSchema)