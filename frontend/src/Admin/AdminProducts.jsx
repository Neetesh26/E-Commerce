import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

const AdminProducts = () => {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {

    const res = await axiosInstance.get("/v1/products/getAllproducts");
    // console.log(">>>>productssss",res);
    
    setProducts(res.data.products);

  };

  const deleteProduct = async (id) => {

    await axiosInstance.delete(`/v1/admin/delete-product/${id}`);

    fetchProducts();

  };

  useEffect(() => {

    fetchProducts();

  }, []);

  return (

    <div>

      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      <div className="grid grid-cols-3 gap-4">

        {products.map((product) => (

          <div key={product._id} className="border p-4 rounded bg-white">

            <img
              src={product.image?.[0]}
              className="h-40 object-cover w-full"
            />

            <h3 className="font-semibold mt-2">{product.name}</h3>

            <p>₹ {product.price}</p>

            <button
              onClick={() => deleteProduct(product._id)}
              className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );
};

export default AdminProducts;