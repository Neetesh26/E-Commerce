import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { axiosInstance } from "../config/axiosInstance";
import { Link } from "react-router-dom";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user") ?? "{}");

      const res = await axiosInstance.get(`/orders/user/${user._id}`);

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
            <div key={index} className="border p-4 mb-4 rounded">

              {order.products.map((item, i) => (

                <div key={i} className="flex gap-4 items-center">

                  <img
                    className="w-20 h-20 object-cover"
                    src={item.images?.[0]}
                    alt={item.name}
                  />

                  <div className="flex-1">

                    <p className="font-medium">{item.name}</p>

                    <p>₹ {item.price}</p>

                    <p className="text-green-600 font-semibold">
                      {order.status}
                    </p>

                    <p className="text-gray-400 text-sm">
                      {new Date(order.createdAt).toDateString()}
                    </p>

                    {/* Tracking Number */}
                    {order.trackingNumber && (
                      <p className="text-sm text-gray-600">
                        Tracking: {order.trackingNumber}
                      </p>
                    )}

                  </div>

                  {/* Track Button */}
                  {order.trackingNumber && (

                    <Link to='/working' className="bg-black text-white px-4 py-2 rounded text-sm">Track Order</Link>
                    // <a
                    //   href={`https://tracking.goshippo.com/${order.trackingNumber}`}
                    //   target="_blank"
                    //   rel="noreferrer"
                    //   className="bg-black text-white px-4 py-2 rounded text-sm"
                    // >
                    //   Track Order
                    // </a>
                  )}

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