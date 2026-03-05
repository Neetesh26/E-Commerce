import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div className=''>
            <img className='mb-5 w-32' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>We are committed to delivering quality products and exceptional service. Our goal is to make every customer experience seamless, reliable, and enjoyable.</p>
        </div>

        <div className=''>
            <p className='text-xl font-medium mb-5'> COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        
        <div>
        <p className='text-xl font-medium mb-5'> GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
                <li>📞 +91-5645-5648-12</li>
                <li>✉️ ForeverIND@gmail.com</li>
                
            </ul>
        </div>
        
      </div>

      <div>
        <hr />
        <p className='py-3 text-sm text-center'> Copyright 2026 forever.com All Right Reserved.</p>
<p className='text-sm text-center text-gray-600 font-semibold'>Love with Neetesh❤️</p>        
      </div>
    </div>
  )
}

export default Footer
