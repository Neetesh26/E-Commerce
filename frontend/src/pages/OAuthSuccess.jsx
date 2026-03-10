import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { jwtDecode } from "jwt-decode";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(ShopContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const id = params.get("id");

    if (token && id) {
      const decoded = jwtDecode(token);

      const userObj = {
        email: decoded.email,
        role: decoded.role || "user",
        _id: id,
        token,
      };
      console.log(">>>>>>>",userObj);
      
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));

      toast.success("Login Successful via Google");

      // ✅ role check
      if (userObj.role === "admin") {
        navigate("/admin"); 
      } else {
        navigate("/"); 
      }

    } else {
      toast.error("Google login failed");
      navigate("/login");
    }
  }, [navigate, setUser]);

  return <div>Logging in via Google...</div>;
};

export default OAuthSuccess;