import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-white border-r min-h-screen">

      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-semibold tracking-wide">
          FOREVER<span className="text-pink-500">.</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-2 p-6">

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm ${
              isActive
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/admin/add-product"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm ${
              isActive
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          Add Product
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm ${
              isActive
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          Orders
        </NavLink>

      </div>
    </div>
  );
};

export default AdminSidebar;