import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { axiosInstance } from "../config/axiosInstance";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user") ?? "{}");

      const res = await axiosInstance.get(`/orders/user/${user._id}`);
      // console.log(">>>>>",res);
      
      setOrders(res.data.orders);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-t pt-16">

      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>

        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="border p-4 mb-4">

              {order.products.map((item, i) => (

                <div key={i} className="flex gap-4">

                  <img
                    className="w-20"
                    src={item.images?.[0]}
                    alt={item.name}
                  />

                  <div>

                    <p className="font-medium">{item.name}</p>

                    <p>₹ {item.price}</p>

                    <p className="text-green-500">{order.status}</p>

                    <p className="text-gray-400">
                      {new Date(order.createdAt).toDateString()}
                    </p>

                  </div>

                </div>

              ))}

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default Orders;