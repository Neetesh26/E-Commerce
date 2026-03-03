import { createContext, useEffect, useState } from "react";
import { productsData } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "INR";
  const delivery_fee = 10;

  const [search, setsearch] = useState("");
  const [showSearch, setshowSearch] = useState(false);
  const [cartItems, setcartItems] = useState({});
  const [dbProducts, setDbProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  //  FETCH DB PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get(
          "/v1/products/getAllproducts"
        );

        // console.log("rews only>>>>>>",res);
        // console.log("api calling data>>>>>>",res.data.products);
        if (res.data) {
          setDbProducts(res.data.products);
          
        }
      } catch (error) {
        // console.log("DB fetch failed, using local products");
      }
    };

    fetchProducts();
  }, [ setDbProducts,]);

  useEffect(() => {
    const merged = [...dbProducts, ...productsData];
    setAllProducts(merged);

    // console.log("merge productss>>>>",merged);
    
  }, [dbProducts, productsData]);


  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Please select the size");
      return;
    }

    setcartItems((prev) => {
      const updated = structuredClone(prev);

      if (!updated[itemId]) updated[itemId] = {};
      updated[itemId][size] =
        (updated[itemId][size] || 0) + 1;

      return updated;
    });

    toast.success("Item added to cart");
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, sizes) =>
        total +
        Object.values(sizes).reduce(
          (sum, qty) => sum + qty,
          0
        ),
      0
    );
  };

  const updateQuantity = (itemId, size, quantity) => {
    setcartItems((prev) => {
      const updated = structuredClone(prev);
      updated[itemId][size] = quantity;
      return updated;
    });
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = allProducts.find(
        (product) => product._id === itemId
      );

      if (!itemInfo) continue;

      for (const size in cartItems[itemId]) {
        totalAmount +=
          cartItems[itemId][size] * itemInfo.price;
      }
    }

    return totalAmount;
  };

  const value = {
  
    products: allProducts, 
    currency,
    delivery_fee,
    search,
    setsearch,
    showSearch,
    setshowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    user,
    setUser,
    isAdmin,
  };
  // console.log("value.products>>>",value.products);
  

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;