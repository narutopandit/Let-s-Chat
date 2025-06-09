import { Children, createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import toast from "react-hot-toast";


export const ChatContext = createContext();

export const ChatProvider = ({children})=>{

    const [message, setMessage] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessage, setUnseenMessage] = useState({});

    const {axios, socket} = useContext(AuthContext);

    //get all users
    const getUsers = async ()=>{
        try {
            const { data } = await axios.get('/api/messages/users');
            if(data.success){
                setUsers(data.users);
                setUnseenMessage(data.unseenMessages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //get messages
    const getMessages = async (userId)=>{
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);
            if(data.success){
                setMessage(data.messages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //send message
    //send message
    const sendMessage = async (messageData) =>{
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if(data.success){
                setMessage((previosMessages)=>[...previosMessages, data.message]);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //subscribe to messages
    const subscribeToMessages = ()=>{
        if(!socket){
            return;
        }
        socket.on('receiveMessage', (messageData)=>{
            if(selectedUser && selectedUser._id === messageData.senderId){
                messageData.seen=true;
                setMessage((previosMessages)=>[...previosMessages, messageData]);
                axios.put(`api/messages/mark/${messageData._id}`);
            }else{
                setUnseenMessage((prevUnseenMessage)=>({
                    ...prevUnseenMessage,
                    [messageData.senderId]:prevUnseenMessage[messageData.senderId] ? prevUnseenMessage[messageData.senderId] + 1 : 1
                }))
            }

        })
    }

    //unsubscribe to messages
    const unsubscribeToMessages = ()=>{
        if(!socket){
            return;
        }
        socket.off('receiveMessage');
    }

    useEffect(()=>{
        subscribeToMessages();
        return ()=>{
            unsubscribeToMessages();
        }
    },[socket, selectedUser])


    const value = {
        message,
        users,
        selectedUser,
        unseenMessage,
        setSelectedUser,
        getUsers,
        getMessages,
        sendMessage,
        setMessage,setUnseenMessage
    }
    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}