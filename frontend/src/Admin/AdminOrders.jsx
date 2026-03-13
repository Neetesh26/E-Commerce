import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axiosInstance.get("/v1/admin/orders");
    // console.log(">>>>>>res", res.data.data);

    setOrders(res.data.data);
    // console.log(">>>>>>orders", orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    await axiosInstance.patch(`/v1/admin/orders/${orderId}`, {
      status,
    });

    fetchOrders();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      {orders?.map((order) => (
        <div key={order._id} className="border p-4 mb-4 bg-white rounded">
          <p className="font-bold">Order ID: {order._id}</p>

          <p>Status: {order.status}</p>

          <p>Date: {new Date(order.createdAt).toDateString()}</p>

          {order.products.map((p, i) => (
            <div key={i} className="flex gap-3 mt-2">
              <img src={p.images?.[0]} className="w-16" />

              <div>
                <p>{p.name}</p>

                <p>₹{p.price}</p>
              </div>
            </div>
          ))}

          <div className="mt-3">
            <select
              onChange={(e) => updateStatus(order._id, e.target.value)}
              value={order.status}
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
