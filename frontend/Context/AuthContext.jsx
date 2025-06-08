import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import io from 'socket.io-client';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = backendUrl;

// Create context as a separate declaration
export const AuthContext = createContext();

// Define provider as a separate function declaration
export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    //Check if the User is authenticated or not
    const checkAuth = async ()=>{
        try {
            const {data} =  await axios.get('/api/auth/check');
            if(data.success){
                setAuthUser(data.user);
                connectSocket(data.user); 
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //Login User
    const login = async (state, credentials) => {
        try {
            const {data} = await axios.post(`/api/auth/${state}`,credentials);
            console.log(data);
            if(data.success){
                setToken(data.token);
                setAuthUser(data.user);
                connectSocket(data.user);
                toast.success(data.message);
                axios.defaults.headers.common['token']= data.token;
                localStorage.setItem('token',data.token);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //Logout User
    const logout = async () => {
        localStorage.removeItem('token');
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        setSocket(null);
        axios.defaults.headers.common['token']= null;
        toast.success('Logged Out Successfully');
        socket?.disconnect();
    }
    
    //update Profile
    const updateProfile = async (body) => {
        try {
            const {data} = await axios.put('/api/auth/update-profile',body);
            if(data.success){
                setAuthUser(data.user);
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //connect to socket 
    const connectSocket = (userData)=>{
        if(!userData || socket?.connected) return;
        const newSocket = io(backendUrl,{
            query:{
                userId: userData._id
            }
        });
        newSocket.connect();
        setSocket(newSocket);
        newSocket.on('getOnlineUsers',(userIds)=>{
            setOnlineUsers(userIds);
        })
    }

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['token']= token;
        }
        checkAuth(); 
    },[])

    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile, 
    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}