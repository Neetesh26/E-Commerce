import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {

    const {products} = useContext(ShopContext)
    const [bestSeller,setbestSeller] = useState([])

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller))
        setbestSeller(bestProduct.slice(0,5))
    },[products])
  return (
    <div className='my-12'>
      <div className='text-center text-3xl py-3'>
        <Title text1={'BEST'} text2={'SELLER'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-4'>
Discover our top-rated product that customers love! Crafted with care and attention to detail, it delivers quality, style, and reliability. Don’t miss out on this favorite choice that keeps everyone coming back for more.        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            bestSeller.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
        }
      </div>
    </div>
  )
}

export default BestSeller
