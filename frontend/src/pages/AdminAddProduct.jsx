import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { ShopContext } from "../context/ShopContext";
import OrdersChart from "../components/OrdersChart";

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(ShopContext);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [ordersData, setOrdersData] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productName", form.name);
    formData.append("amount", form.price);
    formData.append("description", form.description);
    formData.append("category", form.category);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/admin/create-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("res is-->", res);

      setMessage("Product added successfully!");
    } catch (err) {
      console.log("err is-->", err);
      setMessage("Error adding product.");
    }
  };

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:5000/api/orders');
  //       const aggregated = aggregateOrders(res.data);
  //       setOrdersData(aggregated);
  //     } catch (err) {
  //       const today = new Date();
  //       const mock = Array.from({ length: 7 }).map((_, i) => {
  //         const d = new Date();
  //         d.setDate(today.getDate() - (6 - i));
  //         const label = `${d.getMonth() + 1}/${d.getDate()}`;
  //         return { label, value: Math.floor(Math.random() * 20) + 1 };
  //       });
  //       setOrdersData(mock);
  //     }
  //   };
  //   fetchOrders();
  // }, []);

  const aggregateOrders = (orders) => {
    const map = new Map();
    (orders || []).forEach((o) => {
      const d = new Date(o.createdAt || o.date);
      const label = `${d.getMonth() + 1}/${d.getDate()}`;
      map.set(label, (map.get(label) || 0) + (o.total || 1));
    });
    return Array.from(map.entries()).map(([label, value]) => ({
      label,
      value,
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <div
        className="flex items-center justify-center mb-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Admin Logo" className="h-12 w-12 mr-2" />
        <span className="text-xl font-bold">Admin Panel</span>
      </div>
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="file"
          name="images"
          multiple
          onChange={(e) => setImages(e.target.files)}
          className="w-full border p-2 rounded"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="KIDS">Kids</option>
          <option value="MENS">Mens</option>
          <option value="WOMENS">Womens</option>
          <option value="SHOES">Shoes</option>
          <option value="GAMING">Gaming</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          Order History (last days)
        </h3>
        {ordersData ? (
          <OrdersChart data={ordersData} />
        ) : (
          <p className="text-sm text-gray-500">Loading orders...</p>
        )}
      </div>
    </div>
  );
};

export default AdminAddProduct;
