import cloudinary from "../lib/cloudinary.js";
import Message from "../model/Message.js";
import User from "../model/User.js";
import { userSocketMap } from "../server.js";

//sidebar
export const getSidebarUser = async (req,res)=>{
    try {
        const userId = req.user._id;
        const filteredUser = await User.find({_id:{$ne:userId}});
        const unseenMessages = {};
        const promises = filteredUser.map(async (user)=>{
            const messages = await Message.find({senderId:user._id,receiverId:userId,seen:false});
            if(messages.length>0){
                unseenMessages[user._id] = messages.length;
            }
        })
        await Promise.all(promises);
        res.json({success:true,users:filteredUser,unseenMessages});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

//get Messages

export const getMessages = async (req, res) => {
    try {
        const { selectedUserId } = req.params;
        const userId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId:userId,receiverId:selectedUserId},
                {senderId:selectedUserId,receiverId:userId},
            ]
        });
        await Message.updateMany({senderId:selectedUserId,receiverId:userId},{$set:{seen:true}});
        res.json({success:true,messages});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

//mark as seen

export const markAsSeen = async (req, res) => {
    try {
        const {id} = req.params;
        await Message.updateMany({_id:id},{$set:{seen:true}});
        res.json({success:true});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

//send message

export const sendMessage = async (req, res) => {
    try {
        const {text,image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;
        let imageUrl;
        if(image){
            const upload = await cloudinary.uploader.upload(image);
            imageUrl = upload.secure_url;
        }
        const message = await Message.create({senderId,receiverId,text,image:imageUrl});

        const receiverSocketId = userSocketMap[receiverId];
        if(receiverSocketId){
            io.to(receiverSocketId).emit('receiveMessage',message);
        }

        res.json({success:true,message});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}