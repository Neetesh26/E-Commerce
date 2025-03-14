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
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi laborum minima fugit nemo eius voluptas saepe aspernatur aliquid harum odio amet, nisi accusantium? Labore alias voluptatum corporis nostrum velit quae.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi laborum minima fugit nemo eius voluptas saepe aspernatur aliquid harum odio amet, nisi accusantium? Labore alias voluptatum corporis nostrum velit quae.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit a animi cupiditate nesciunt natus aperiam in dicta soluta omnis saepe.</p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title  text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 gap-2">

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Quality Assurance:</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, laborum.</p>

        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Convenience:</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, laborum.</p>

        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Exceptional Customer Service:</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, laborum.</p>

        </div>

      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
