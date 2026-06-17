import { uploadFileCloudinary } from "../config/cloudinary.js";
import { BadRequestError, InternalServerError, NotFoundError } from "../middleware/error.middleware.js";
import Post from "../models/post.models.js"
import Category from "../models/category.models.js"

export const create_post = async (req , res)=>{
    const {title , slug   , admin , category , country } = req.body;
    if (!title || !slug  || !admin || !category || !country) {
       throw new BadRequestError("Please fill all fields ");
    }

      if(!req.file){
            throw new BadRequestError("File is missing");
        }


    try{
       

       let now = new Date();
       let Published_date = now.toDateString();
        
        

        const imgURI = await uploadFileCloudinary(req.file.path);
        const new_post = await Post.create({
            title,
            slug,
            img : imgURI,
            publishes_at  : Published_date,
            admin , 
            category ,
            country,
        })

        res.status(201).json({  success : true , message : "Post is created !!!" , data : new_post})

    }catch (err){
        throw new InternalServerError(err);
    }

}


// for get any post

export const get_single_post = async (req , res)=>{
    const { id } = req.params ;
    if (!id){
        throw new BadRequestError("Post id not given !!!");
    }

    try {   
        const post = await Post.findById(id).populate("category", "name slug").populate("country", "name")

        if (!post ){
            throw new NotFoundError("Post not found ");
        }

        res.status(200).json({
            success : true ,
            data : post
        })

    }catch(err){
        throw new InternalServerError(err.message);
    }
}


// for category based posts 

export const category_posts = async (req , res)=>{
    const { slug } = req.params;

    if (!slug){
        throw new BadRequestError("Category slug not define ");
    }

    try {   

        const category = await  Category.findOne({ slug:slug.toLowerCase()});

        if (!category){
            throw new NotFoundError("Category not found");
        }

        const posts = await Post.find({category : category._id}).populate("admin", "name email").populate("category" , "name slug").populate("country", "name").sort({createdAt : -1 });
        res.status(200).json({
        success: true,
            count: posts.length,
            category: {
                name: category.name,
                slug: category.slug
            },
            data: posts
        });

    }catch (err){
        throw new InternalServerError(err);
    }
}


// get all posts 

export const get_all_posts = async (req, res)=>{
    const posts = await  Post.find().populate("admin", "name email").populate("category", "name slug" ).populate("country" , "name").sort({ createdAt : -1});

    
    res.status(200).json({
        success: true,
            count: posts.length,
            data: posts
    })
}



// update an post 

export const update_post = async (req , res)=>{
    const {id} = req.params;
    const { title, slug, img, admin, category, country } = req.body;

     if (!title || !slug  || !admin || !category || !country) {
       throw new BadRequestError("Please fill all fields ");
    }
    if (!id){
        throw new BadRequestError("Id not found ");
    }

    try{

        const post = await Post.findByIdAndUpdate(id , { title, slug , img, admin, category, country}, {new: true  , runValidators : true}) ;

        if(!post){
            throw new NotFoundError("Post not found");
        }

        res.status(200).json({
            success : true,
            message : "Post is updated",
            data : post 
        })

    }catch(err){
        throw new InternalServerError(err);
    }
}


// for delete a post 

export const delete_post = async (req , res)=>{
    const { id} = req.params;
    if(!id){
        throw new BadRequestError("Id not provide ");
    }

    try {

        await Post.findByIdAndDelete(id);

        res.status(200).json({
            success : true ,
            message : "Post is deleted",
        })

    }catch (err){
        throw new InternalServerError(err);
    }
} 
