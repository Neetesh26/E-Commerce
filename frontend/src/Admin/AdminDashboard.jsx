import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-[#f9f9f9] z-[-1]">

      {/* Sidebar */}
      <div className="w-64 border-r bg-white fixed h-full">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="ml-60 flex-1 overflow-y-auto p-10">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminDashboard;