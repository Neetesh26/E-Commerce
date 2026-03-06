import React from 'react';
import { useNavigate } from 'react-router-dom';

import men from "../assets/men-cat.avif";
import women from "../assets/p_img1.png";
import Bags from '../assets/bag-cat.jpg';
import electronics from '../assets/elec-cat.jpg';
import homeKitchen from '../assets/home-kitchen-cat.webp' ;
import toys from '../assets/toys-cat.avif';
import kids from '../assets/kids-cat.avif';
import Gaming from '../assets/gameing-cat.jpg';
import mobiles from '../assets/mobile-cat.jpg';
import Watches from '../assets/watches-cat.jpg';
import cars from '../assets/cars-cat.jpg';
import Shoes from '../assets/shoes-cat.jpg'
const CategorySection = () => {
  const navigate = useNavigate();


  const categories = [
    { label: 'Men', icon: men },
    { label: 'Women', icon: women },
    { label: 'Bags', icon: Bags },
    { label: 'Electronics', icon: electronics },
    { label: 'Home & Kitchen', icon: homeKitchen },
    { label: 'Shoes', icon: Shoes },
    { label: 'Kids', icon: kids },
    { label: 'Gaming', icon: Gaming },
    { label: 'Watches', icon: Watches },
    { label: 'Toys', icon: toys },
    { label: 'Mobiles', icon: mobiles },
    { label: 'Cars', icon: cars },
  ];

  const handleClick = (value) => {
    navigate(`/collection?category=${encodeURIComponent(value)}`);
  };

  return (
    <div className="my-10">
  <div className="text-center py-4 text-2xl font-semibold">
    Shop by Category
  </div>

  <div className="flex flex-wrap justify-center gap-6 overflow-x-auto py-2">
    {categories.map((cat) => (
      <button
        key={cat.label}
        onClick={() => handleClick(cat.label)}
        className="flex flex-col items-center w-24 sm:w-28 p-2 hover:bg-gray-100 rounded"
      >
        <div className="w-16 h-16 flex items-center justify-center">
          <img
            src={cat.icon}
            alt={cat.label}
            className="w-full h-full object-cover rounded"
          />
        </div>

        <span className="text-xs text-center mt-1">{cat.label}</span>
      </button>
    ))}
  </div>
</div>
  );
};

export default CategorySection;
