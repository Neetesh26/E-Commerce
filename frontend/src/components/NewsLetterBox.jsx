import React, { useState } from 'react'

const NewsLetterBox = () => {

    const [ Email ,setEmail] = useState("")

    const SubmitHandler = (e)=>{
        e.preventDefault();
        setEmail("");
    }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      <form onSubmit={(e)=>SubmitHandler(e)} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input value={Email} onChange={(e)=>{setEmail(e.target.value)}} className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your Email...' required/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
