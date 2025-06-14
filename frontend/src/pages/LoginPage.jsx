import React, { useContext, useState } from 'react'
import assets from '../assets/chat-app-assets/assets'
import { AuthContext } from '../../Context/AuthContext';

const LoginPage = () => {
  const [currState, setCurrState] = useState("Signup");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    if(currState === "Signup" && !isDataSubmitted){
      setIsDataSubmitted(true);
    }
    login(currState ==='Signup' ?'signup':'login',{
      fullName,
      email,
      password,
      bio
    })
  }
 
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* Left */}
      <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />

      {/* right  */}

      <form onSubmit={onSubmitHandler} className=' border-2 bg-white/8 text-white border-gray-500 p-6 flex
flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center' >
          {currState}
          {isDataSubmitted && <img onClick={()=>{isDataSubmitted(false);}} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}
          
        </h2>
        {currState === "Signup" && !isDataSubmitted && (
          <input type="text"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder="Full Name" required />
        )}
        {!isDataSubmitted && (<>
          <input type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder="abc@gmail.com" required />
          <input type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder="......." required />
        </>)}

        {currState === "Signup" && isDataSubmitted && (
          <textarea onChange={(e) => setBio(e.target.value)} value={bio}
            rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus : ring-2 focus:ring-indigo-500'
            placeholder='provide a short bio.'
            required></textarea>
        )}

        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer' >
          {currState ===
            "Signup" ? "Create Account"
              : "Login Now"}
        </button>

        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className='flex flex-col gap-2'>
          {
            currState === "Signup"? (
              <p className='text-sm text-gray-600'>Already have an account? <span onClick={()=>{ setCurrState("Login"); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>
            ):(
              <p className='text-sm text-gray-600'>Create an account. <span onClick={()=>{ setCurrState("Signup")}} className='font-medium text-violet-500 cursor-pointer'>Register here</span></p>
            )
          }
        </div>
      </form>
    </div>
  )
}

export default LoginPage