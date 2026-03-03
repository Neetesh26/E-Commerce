import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import CardInputForm from "../components/StripeWindow";
// import CardInputForm from "./CardInputForm";

const stripePromise = loadStripe(
  "pk_test_51T4KDe1OJnHAVnv6Xi6jIqG1HcK3WGp6WPfUNm9Z5Qm8a4t9E5snuOLLQpCZhmg2SFOPiFncSQx1XqnRIQPHw54r008iXQVwCa"
);

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { cartItems, products, navigate } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [requiresCard, setRequiresCard] = useState(false);
  const [cartItemsToProcess, setCartItemsToProcess] = useState([]);

  const prepareCartItems = () => {
    const items = [];

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            // console.log(">>>>",product);
            
            items.push({
              id: product._id,
              name: product.name,
              price: product.price,
              images : product.image,
            });
          }
        }
      }
    }
    
    return items;
  };

  const handleCheckout = async () => {
    if (method === "cod") {
      navigate("/orders");
      return;
    }

    setLoading(true);

    try {
      const items = prepareCartItems();

      if (items.length === 0) {
        alert("Cart is empty");
        return;
      }

      setCartItemsToProcess(items);
      setRequiresCard(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (requiresCard) {
    return (
      <div className="pt-10">
        <Elements stripe={stripePromise}>
          <CardInputForm
            cartItemsToProcess={cartItemsToProcess}
            setCartItemsToProcess={setCartItemsToProcess}
            setRequiresCard={setRequiresCard}
          />
        </Elements>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />

          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              {loading ? "Processing..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;