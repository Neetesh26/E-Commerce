import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {


  const { productId } = useParams();
  // console.log(productId);
  const {products,currency , addToCart} = useContext(ShopContext)
  const [productData, setproductData] = useState(false)
  const [image, setimage] = useState('')
  const [size,setsize] =useState('')
  
  const fetchProduct = async ()=>{
   
    products.map((item)=>{
      if (item._id === productId) {
        setproductData(item)
        // console.log(item);
        setimage(item.image[0])
        return null;
      }
    })
  }
  useEffect(()=>{
    fetchProduct()
  },[productId,products])


  return productData ? (
    <div className=" border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
        {/* product data */}
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

          {/* product images */}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
            <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {
                productData.image.map((item,index)=>(
                  <img onClick={()=>setimage(item)} src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt="" />
                ))
              }
            </div>

              <div className="w-full sm:w-[80%] ">
                <img className="w-full h-auto" src={image} alt="" />
              </div>
            </div>
            {/* product information */}
            <div className="flex-1">
              <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
              <div className="flex items-center gap-1 mt-2">
                <img src={assets.star_icon} alt="" className="w-3.5" />
                <img src={assets.star_icon} alt="" className="w-3.5" />
                <img src={assets.star_icon} alt="" className="w-3.5" />
                <img src={assets.star_icon} alt="" className="w-3.5" />
                <img src={assets.star_dull_icon} alt="" className="w-3.5" />
                <p className="pl-2">{122}</p>
              </div>
              <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
              <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
              <div className="flex flex-col gap-4 my-8">
                <p>Select size</p>
                <div className="flex gap-2">
                  {
                    productData.sizes.map((item,index)=>(
                      <button onClick={()=>setsize(item)} className={`border py-2 px-4 bg-gray-100 ${item ===size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                    ))
                  }
                </div>
              </div>
              <button onClick={()=>addToCart(productData._id,size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
              <hr className="mt-8 sm:w-4/5" />
              <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>100% Original Product.</p>
                <p>Caash on delivery is available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
        </div>
        {/* description */}
        <div className="mt-20">
          <div className="flex">
            <b  className="border px-5 py-3 text-sm">Description</b>
            <p className="border px-5 py-3 text-sm">Reviews(122)</p>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>An e-commerce is an online plateform that facilities the buying and selling. Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet accusantium, quaerat veniam quae nulla magnam distinctio quam culpa quod debitis repellendus id hic perferendis recusandae officia voluptates inventore nisi consectetur!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit adipisci atque rem, repellat a sed sunt exercitationem facere voluptate aperiam nobis possimus ea sapiente, aspernatur labore, porro quidem. Amet molestias incidunt porro facilis, saepe soluta nesciunt rem id, ipsa vel ipsum maxime aliquam! Officia fugiat expedita perferendis! Sit fugiat quibusdam, voluptatibus libero nostrum omnis nulla culpa nobis voluptas, ipsa rerum eos rem quo minus quidem deserunt deleniti harum fugit ad numquam atque doloremque repellendus aliquid! Laboriosam nulla iure placeat dolor ratione repudiandae fugiat rem, debitis saepe doloremque recusandae quo omnis vitae esse voluptate reiciendis laborum ut? Fugiat dicta vitae vero magni, dolore, ipsum molestias dolores neque totam deleniti hic facere iusto expedita officiis corrupti impedit praesentium quo eveniet.</p>
          </div>
        </div>
        {/*  display realated product */}
        <RelatedProduct  category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ): <div className='opacity-0'></div>
};

export default Product;
