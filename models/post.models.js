import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title : {type : String , required : true},
    slug : {type : String ,   required : true},
    img : {type : String  , required : true},
    publishes_at  : {type : Date , required : true},
    admin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Admin",
        required : true
    },
     category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
        required : true
    },
     country : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Country",
        required : true
    }
} , {timestamps : true});
export default mongoose.model("Post", postSchema)