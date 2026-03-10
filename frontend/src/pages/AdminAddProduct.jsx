import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import { ShopContext } from "../context/ShopContext";
import { axiosInstance } from "../config/axiosInstance";

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(ShopContext);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/login");
    }
  }, [isAdmin, navigate]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      subCategory: "",
      sizes: [],
      bestseller: false,
      images: [],
    },
  });

  const [message, setMessage] = useState("");

  const sizeOptions = ["S", "M", "L", "XL"];

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append("sizes", JSON.stringify(data.sizes || []));
      formData.append("bestseller", String(data.bestseller));

      // Handle images
      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append("images", file);
        });
      }

      await axiosInstance.post(
        "/v1/admin/create-product",
        formData,
      );

      setMessage("✅ Product added successfully!");
      reset(); // reset form
    } catch (error) {
      console.error(error);
      setMessage("❌ Error adding product.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <div
        className="flex items-center justify-center mb-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        {/* <img src={logo} alt="Admin Logo" className="h-12 w-12 mr-2" /> */}
        <span className="text-xl font-bold">Admin Panel</span>
      </div>

      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          {...register("name", { required: true })}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          {...register("description", { required: true })}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          {...register("price", { required: true })}
          className="w-full border p-2 rounded"
        />

        <select
          {...register("category", { required: true })}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Shoes">Shoes</option>
        </select>

        <input
          type="text"
          placeholder="Sub Category"
          {...register("subCategory")}
          className="w-full border p-2 rounded"
        />

        {/* Sizes */}
        <div>
          <p className="font-semibold">Select Sizes:</p>
          <div className="flex gap-3 mt-2">
            {sizeOptions.map((size) => (
              <label key={size}>
                <input type="checkbox" value={size} {...register("sizes")} />{" "}
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <label>
          <input type="checkbox" {...register("bestseller")} /> Bestseller
        </label>

        {/* Images */}
        <input
          type="file"
          multiple
          {...register("images")}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Add Product
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AdminAddProduct;
