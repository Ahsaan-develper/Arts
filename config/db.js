import mongoose from "mongoose"
import  _config  from "./config.js";


export const connectDB = async ()=>{

        if (!_config.mongo_uri){
            console.log("The mongo string is not found");
            return;
        }

        try{
            mongoose.connection.on("connected", ()=>{
            console.log("Your database is connected !!!");
        });

        mongoose.connection.on("disconnected", ()=>{
            console.log("Database is not connected !!!");
        });

        mongoose.connection.on("close", ()=>{
            console.log("Connection is close !!!");
        });

        await mongoose.connect(_config.mongo_uri);
        }catch(err){
            console.log(err);
        };

}