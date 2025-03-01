import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext()

const ShopContextProvider =(props) =>{

    const currency = "$";
    const delivery_fee = 10;
    const [search, setsearch] = useState("");
    const [showSearch, setshowSearch] = useState(false);
    const [cartItems , setcartItems] = useState({})

    const navigate =useNavigate()


    const addToCart = async (itemId,size) =>{
        let cartData = structuredClone(cartItems);
        
        if (!size) {
            toast.error('please select the size')
            return;
        }
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] +=1;
                // console.log(cartData);
                
            }
            else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] ={}
            cartData[itemId][size] = 1
        }
        setcartItems(cartData)
    }

        // useEffect(() => {
        //   console.log(cartItems);
        // }, [cartItems]);

        const getCartCount = () =>{
            let totalCount = 0;
            for(const items in cartItems){
                for(const item in cartItems[items]){
                    try {
                        if (cartItems[items][item] > 0 ) {
                            totalCount += cartItems[items][item];
                        }
                    } catch (error) {
                        // console.log(error);
                        
                    }
                }
            }
            return totalCount;
        }


        const updateQuantity= async (itemId, size,quantity)=>{
            let cartData =structuredClone(cartItems)
            cartData[itemId][size] = quantity

            
            setcartItems(cartData)
        }

        const getCartAmount = ()=>{
            let totalAmount = 0;
            for(const items in cartItems){
                let itemInfo =  products.find((product) => product._id === items)
                for(const item in cartItems[items]){
                    try {
                        if (cartItems[items][item] > 0 ) {
                            totalAmount += cartItems[items][item] * itemInfo.price;
                        }
                    } catch (error) {
                        // console.log(error);
                        
                    }
                }
            }
            return totalAmount;
        }
            // console.log(get);
            
    const value={
        products,currency,delivery_fee,
        search,setsearch,showSearch,setshowSearch,
        cartItems,addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate
    }
    return(
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
)
}
export default ShopContextProvider