import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {

const { search ,setsearch, showSearch, setshowSearch ,products} = useContext(ShopContext)

const location = useLocation();

const [inputValue, setInputValue] = useState(search);
const [suggestions, setSuggestions] = useState([]);

  useEffect(()=>{
    setshowSearch(false)
    setsearch('')
    setSuggestions([])
  },[location])

 useEffect(() => {

  const timer = setTimeout(() => {

    if(inputValue.trim().length > 1){

      setsearch(inputValue);

      const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );

        setSuggestions(filteredProducts.slice(0,5));

    } else {
      setSuggestions([]);
    }

  }, 500);

  return () => clearTimeout(timer);

}, [inputValue, products]);

    
  return showSearch ? (
    <div className='border-t border-b bg-gray-50 text-center relative'>
        
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            
            <input 
              value={inputValue} 
              onChange={(e)=>setInputValue(e.target.value)} 
              className='flex-1 outline-none py-2 bg-inherit text-sm' 
              type="text" 
              placeholder='Search'
            />
            
            <img className='w-4' src={assets.search_icon} alt="" />
        </div>

        {suggestions.length > 0 && (
          <div className='absolute left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-md w-3/4 sm:w-1/2 max-h-60 overflow-y-auto z-50'>
            
            {suggestions.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  setInputValue(item.name);
                  setSuggestions([]);
                }}
                className='px-4 py-2 text-left hover:bg-gray-100 cursor-pointer text-sm'
              >
                {item.name}
              </div>
            ))}

          </div>
        )}

        <img 
          onClick={()=>setshowSearch(false)} 
          className='inline w-3 cursor-pointer' 
          src={assets.cross_icon} 
          alt="" 
        />
    </div>
  ) : null
}

export default SearchBar