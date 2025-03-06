import React, { useState } from 'react'

const Login = () => {

  const [currentState , setcurrentState] = useState('Login')
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const onSubmitHandler =(e) =>{
    e.preventDefault();
    // console.log("Email is", { Email });
    // console.log("password is ", { password });

    setEmail('')
    setpassword('')
  }
  return (
    <form onSubmit={(e)=>onSubmitHandler(e)} className='flex flex-col item-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'> 
      <div className='inline-flex items-center gap-2 mb-2 mt-10'> 
        <p className='font-serif text-3xl '>{currentState}</p>
        <hr className='border-none h-[1.5px w-8 bg-gray-800]'/>
      </div>
      {currentState ==='Login' ? '' : <input className='border border-gray-800 py-2 px-3 w-full' type="number"  placeholder='Name' required/>}
      <input value={Email} onChange={(e)=>setEmail(e.target.value)} className='border border-gray-800 py-2 px-3 w-full' type="email"  placeholder='Email' required/>
      <input value={password} onChange={(e)=>setpassword(e.target.value)} className='border border-gray-800 py-2 px-3 w-full' type="password"  placeholder='password' required/>

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className='cursor-pointer font-semibold'>Forgot your password?</p>

        {
          currentState==='Login' 
          ? <p onClick={()=>setcurrentState('Sign Up')} className='cursor-pointer font-semibold'>Create account</p>
          : <p onClick={()=>setcurrentState('Login')} className='cursor-pointer font-semibold'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign in' : 'Sign Up'}</button>
      </form>
  )
}

export default Login
