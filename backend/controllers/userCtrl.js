import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../model/User.js";
import bcrypt from "bcryptjs";

//Signup
export const signup = async (req, res) => {
const {fullName, email, password , bio} = req.body;
try{
    if(!fullName || !email || !password){
        return res.status(400).json({success: false,message: "All fields are required"});
    }
     const user = await User.findOne({email});
     if(user){
        return res.status(400).json({success: false,message: "User already exists"});
     }
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
        bio,
     });
     const token = generateToken(newUser._id);
     return res.status(201).json({success: true,message: "User created successfully",user: newUser,token});
}catch(err){
    return res.status(500).json({success: false,message: err.message});
}
}

//Signin

export const signin = async (req, res) => {
const {email, password} = req.body;
try{
    if(!email ||!password){
        return res.status(400).json({success: false,message: "All fields are required"});
    }
     const user = await User.findOne({email});
     if(!user){
        return res.status(400).json({success: false,message: "User does not exist"});   
     }
     const isMatch = await bcrypt.compare(password, user.password);
     if(!isMatch){
        return res.status(400).json({success: false,message: "Invalid credentials"});
     }
     const token = generateToken(user._id);
     return res.status(200).json({success: true,message: "User signed in successfully",user: user,token});
    }catch(err){
        return res.status(500).json({success: false,message: err.message});
    }
}

export const checkAuth = async (req, res) => {
    return res.json({success: true, user: req.user})
}

//update profile

export const updateProfile = async (req, res) => {
    const {profilePic, bio, fullName} = req.body;
    try {
        const userId = req.user._id;
        if(!profilePic){
            const updatedUser = await User.findByIdAndUpdate(userId,{bio, fullName}, {new: true});
            return res.status(200).json({success: true, message: "Profile updated successfully", user: updatedUser});
        }else{
            const upload = await cloudinary.uploader.upload(profilePic);
            const updatedUser = await User.findByIdAndUpdate(userId,{profilePic: upload.secure_url, bio, fullName}, {new: true});
            return res.status(200).json({success: true, message: "Profile updated successfully", user: updatedUser});
        }
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}