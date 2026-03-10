import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "../config/axiosInstance";

const OAuthSuccess = () => {

  const navigate = useNavigate();
  const { setUser } = useContext(ShopContext);

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const id = params.get("id");

    const handleGoogleLogin = async () => {

      if (!token || !id) {
        toast.error("Google login failed");
        navigate("/login");
        return;
      }

      try {

        const decoded = jwtDecode(token);

        // 🔹 check user in database
        const res = await axiosInstance.get(`v1/auth/find-user?email=${decoded.email}`);
        console.log("res>>>",res);
        
        const dbUser = res.data.user;

        const userObj = {
          email: dbUser.email,
          role: dbUser.role,
          _id: dbUser._id,
          token
        };

        console.log(">>>>>>>", userObj);

        setUser(userObj);
        localStorage.setItem("user", JSON.stringify(userObj));

        toast.success("Login Successful via Google");

        // 🔹 role based redirect
        if (dbUser.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }

      } catch (error) {

        console.error(error);

        toast.error("User fetch failed");

        navigate("/login");

      }

    };

    handleGoogleLogin();

  }, [navigate, setUser]);

  return <div>Logging in via Google...</div>;
};

export default OAuthSuccess;