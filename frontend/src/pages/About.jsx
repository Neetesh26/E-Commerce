import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w2/4 text-gray-600'>
          <p>We are dedicated to providing high-quality products that combine style, functionality, and reliability. Our team works passionately to ensure every experience with us is memorable and satisfying.</p>
          <p>We believe in creating value for our customers through innovation, attention to detail, and exceptional service. Your trust drives us to continually improve and deliver the best.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to empower our customers by offering products that enhance their lifestyle. We strive to provide excellence in every step – from design to delivery – and make every interaction meaningful.</p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title  text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 gap-2">

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Quality Assurance:</b>
        <p>We prioritize top-notch quality in every product. Each item undergoes strict checks to ensure it meets our high standards and your expectations.</p>

        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Convenience:</b>
        <p>Shopping with us is simple, fast, and hassle-free. Enjoy seamless browsing, easy checkout, and timely delivery right to your doorstep.</p>

        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Exceptional Customer Service:</b>
        <p>Our dedicated support team is always ready to assist you. We value your satisfaction and aim to make every experience smooth and enjoyable.</p>

        </div>

      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
