// models/category.models.js
import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: { 
        type: String, 
        required: true,
        unique: true 
    },
    slug: { 
        type: String, 
        required: true,
        unique: true,
        lowercase: true
    },
    description: { type: String }
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);