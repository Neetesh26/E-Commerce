import React from 'react';
import { useNavigate } from 'react-router-dom';

import men from "../assets/p_img2.png";
import women from "../assets/p_img1.png";
import Bags from '../assets/bags.webp';
import electronics from '../assets/electro.webp';
import homeKitchen from '../assets/modern-kitchen.webp'; 
import auto from '../assets/p_img5.png';
import toys from '../assets/p_img6.png';
import Gaming from '../assets/p_img8.png';
import mobiles from '../assets/p_img9.png';
import Watches from '../assets/p_img10.png';
import appliances from '../assets/p_img11.png';
import Shoes from '../assets/shoes.webp'
const CategorySection = () => {
  const navigate = useNavigate();


  const categories = [
    { label: 'Men', icon: men },
    { label: 'Women', icon: women },
    { label: 'Bags', icon: Bags },
    { label: 'Electronics', icon: electronics },
    { label: 'Home & Kitchen', icon: homeKitchen },
    { label: 'Shoes', icon: Shoes },
    { label: 'Kids', icon: toys },
    { label: 'Gaming', icon: Gaming },
    { label: 'Watches', icon: Watches },
    { label: 'Auto Acc', icon: auto },
    { label: 'Mobiles', icon: mobiles },
    { label: 'Appliances', icon: appliances },
  ];

  const handleClick = (value) => {
    navigate(`/collection?category=${encodeURIComponent(value)}`);
  };

  return (
    <div className="my-10">
      <div className="text-center py-4 text-2xl font-semibold">Shop by Category</div>

      <div className="flex flex-wrap justify-center gap-6 overflow-x-auto py-2">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => handleClick(cat.label)}
            className="flex flex-col items-center w-24 sm:w-28 p-2 hover:bg-gray-100 rounded"          
          >
            <img
              src={cat.icon}
              alt={cat.label}
              className="h-14 w-14 object-contain mb-1"
            />
            <span className="text-xs text-center">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
