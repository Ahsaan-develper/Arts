import dotenv from "dotenv";

dotenv.config();

// all env file config here 

 const _config = {
    mongo_uri : process.env.MONGO_STRING,
    port : process.env.PORT,
    access_token : process.env.JWT_ACCESS_KEY,
    refresh_token : process.env.JWT_REFRESH_TOKEN,
    cloudinary_name : process.env.CLOUD_NAME,
    cloudinary_key : process.env.CLOUDINARY_KEY,
    cloudinary_secret_key : process.env.CLOUDINARY_SECRET_KEY,
    env : process.env.NODE_ENV
}

export default _config;