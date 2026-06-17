import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import  _config  from "./config/config.js";
import cookieParser from "cookie-parser";
import user_router from "./routes/user.routes.js";
import admin_router from "./routes/admin.routes.js";
import post_router from "./routes/posts.routes.js";
import { json } from "stream/consumers";
import country_router from "./routes/country.routes.js";
import category_router from "./routes/category.routes.js";
import event_router from "./routes/events.routes.js";
import slider_router from "./routes/slider.routes.js";
import { refresh_handler } from "./middleware/jwt.middleware.js";
import subscriber_router from "./routes/subscriber.routes.js";
import ticket_router from "./routes/tickets.routes.js";
import payment_router from "./routes/payment.routes.js"




const app = express();  
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());


//refresh a token 
app.use("/refresh", refresh_handler);

// user router 
app.use("/user",user_router);

// admin router 
app.use("/admin" , admin_router);

// posts 
app.use("/posts",post_router);

//country 
app.use("/country" , country_router);

//category 
app.use("/category" , category_router);

//event 
app.use("/events" , event_router);

//slider
app.use("/sliders" , slider_router);

//subscription
app.use("/subscriber" , subscriber_router);

//ticket
app.use("/tickets", ticket_router);

//payment
app.use("/payments",payment_router)





const start_server = async ()=>{
    try{
         await connectDB();
   app.listen(_config.port , ()=>{
    console.log("Server is running on port : ", _config.port);
   });
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
} 

start_server();