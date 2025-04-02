//buisness logic
import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { response } from "express";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
export const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name || !email||!password){
            return res.status(400).json({
                success:false,
                message:"All fields required"
            })
            
        }
        const user = await User.findOne({email});//cheching user is present or not
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists."
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);//hashing password
        await User.create({
            name,
            email,
            password:hashedPassword
        });
        return res.status(201).json({
            success:true,
            message:"account created successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to register"
        })
        
    }
}
export const login = async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"All fields required"
            })
            
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"incorrect email or password."
            })
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch)
        {
            return res.status(400).json({
                success:false,
                message:"incorrect email or password."
            });
        }
        generateToken(res,user,`Welcome back ${user.name}`);


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}
export const logout = async (_,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out success",
            success:true
        })
        
    } catch (error) {
        console.log(error);
            return res.status(500).json({
                success:false,
                message:"failed to logout",
            })
        
        
    }
}
export const getUserProfile=async(req,res)=>{
    try {
        const userId=req.id;
        const user=await User.findById(userId).select("-password");
        if(!user){
            response.status(404).json({
                message:"Profile not found",
                success:false,
            })
        }
        return res.status(200).json({
            success:true,
            user
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"failed to get user profile"
        })
    }
    }
    export const updateProfile=async(req,res)=>{
        try {
            const userId=req.id;
            const {name}=req.body;
            const profilePhoto=req.file;
            const user=await User.findById(userId);

            if(!user){
                response.status(404).json({
                    message:"user not found",
                    success:false,
                })

            }
            //extract public id of the old image from url if exist
            if(user.photoUrl)
            {
                const publicId=user.photoUrl.split("/").pop().split(".")[0];//extract public id
                deleteMediaFromCloudinary(publicId);
            }
            //upload new dp
            const cloudResponse=await uploadMedia(profilePhoto.path);
            const photoUrl=cloudResponse.secure_url;
            const updatedData={name,photoUrl};
            const updatedUser=await User.findByIdAndUpdate(userId,updatedData,{new:true}).select("-password");
            return res.status(200).json({
                success:true,
                user:updatedUser,
                message:"profile updated success"
            })

        } catch (error) {
            console.log(error);
        return res.status(500).json({
            success:false,
            message:"failed to update user profile"
        })
            
        }
    }
