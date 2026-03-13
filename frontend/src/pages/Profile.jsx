import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate()

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axiosInstance.get("/v1/profile/my-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading profile...
      </div>
    );
  }

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/")
  };

  return (
    <div className="min-h-screen  flex justify-center items-start pt-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${profile.email}`}
            className="w-20 h-20 rounded-full"
          />

          <div>
            <h2 className="text-2xl font-bold">{profile.email}</h2>
            <p className="text-gray-500 capitalize">{profile.role}</p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-semibold">{profile.email}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <p className="text-gray-500 text-sm">Role</p>
            <p className="font-semibold capitalize">{profile.role}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded col-span-2">
            <p className="text-gray-500 text-sm">User ID</p>
            <p className="font-semibold">{profile._id}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            Edit Profile
          </button>

          <button
            onClick={(e) => handleLogout(e)}
            className="border border-red-500 text-red-500 px-6 py-2 rounded hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
