import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from '../components/Title'
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products , search , showSearch} = useContext(ShopContext);
  const [showFilter,setshowFilter] = useState( false)
  const [filterProduct,setfilterProduct] = useState([])
  const [category,setcategory] = useState([])
  const [subCategory,setsubCategory] = useState([])
  const [sortType , setsortType] = useState('relevent')


  const toggleCategory =(e)=>{
    if(category.includes(e.target.value)){
      setcategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setcategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubcategory =(e)=>{
    if(subCategory.includes(e.target.value)){
      setsubCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setsubCategory(prev => [...prev, e.target.value])
    }
  }


  // useEffect(()=>{
  //   setfilterProduct(products)
  // },[])

  
  const applyfilter =()=>{
    let productsCopy = products.slice()


    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setfilterProduct(productsCopy)
  }

  useEffect(()=>{
    applyfilter()
  },[category,subCategory,search,showSearch])


const sortProduct = () =>{
  let fpCopy = filterProduct.slice()

  switch (sortType) {
    case 'low-high':
      setfilterProduct(fpCopy.sort((a,b)=> (a.price - b.price)))
      break;

    case 'high-low':
      setfilterProduct(fpCopy.sort((a,b)=>(b.price - a.price)))
      break; 

    default:
     applyfilter()

     break
  }
}

  useEffect(()=>{
    sortProduct()
  },[sortType])



  return(
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* filter options */}
      <div className='min-w-60'>
        <p onClick={ ()=> setshowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 
          font-semibold'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>


        {/* category filter */}
        <div className={`border border-gray-300 pl-5 mt-6 p-2 ${showFilter ? '' : 'hidden'} sm:block`}>

          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

          <div className='flex flex-col gap-2 text-sm  font-light text-gray-700'>

              <p className='flex gap-2'>
                <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory}/>Men
              </p>
              <p className='flex gap-2'>
                <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCategory}/>Women
              </p>
              <p className='flex gap-2'>
                <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory}/>Kids
              </p>
          </div>
        </div>


        {/* subcategory filter  */}
        <div className={`border border-gray-300 pl-5 my-5 p-2 ${showFilter ? '' : 'hidden'} sm:block`}>

          <p className='mb-3 text-sm font-medium'>TYPE</p>

          <div className='flex flex-col gap-2 text-sm  font-light text-gray-700'>

              <p className='flex gap-2'>
                <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubcategory}/>Topwear
              </p>
              <p className='flex gap-2'>
                <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubcategory}/>Bottomwear
              </p>
              <p className='flex gap-2'>
                <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubcategory}/>Winterwear
              </p>
          </div>
        </div>

      
      </div>

      {/* right side  */}
      <div className='flex flex-col'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'}  text2={'COLLECTIONS'} />
          {/* product sort */}
          <select onClick={(e)=>setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevent">Sort by : Relevent</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>

        {/* map product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          filterProduct.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={ item.price} />
          ))
        }
        </div>

      </div>
    </div>
  );
};

export default Collection;
