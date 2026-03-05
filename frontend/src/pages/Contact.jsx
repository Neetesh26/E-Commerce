import React from 'react';
import Title from '../components/Title';
import NewsLetterBox from '../components/NewsLetterBox';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">

      {/* Section Title */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Main Contact Info */}
      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28 items-center">
        {/* Image */}
        <img
          className="w-full md:max-w-[480px] rounded-lg shadow-md"
          src={assets.contact_img}
          alt="Contact Us"
        />

        {/* Info */}
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            46568 Glam Road <br />
            Suite 450, Banglore, IND
          </p>
          <p className="text-gray-500">
            Tel: 📞(+91) 9854-6548-23 <br />
            Email:✉️ admin@forever.com
          </p>

          <p className="font-semibold text-xl text-gray-600">Careers at Forever</p>
          <p className="text-gray-500">Learn more about our team and job openings.</p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsLetterBox />

    </div>
  );
};

export default Contact;