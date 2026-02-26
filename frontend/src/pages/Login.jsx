import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(ShopContext);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  // Role will come from backend after OTP verification

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
       await axios.post(
        "http://localhost:5000/api/v1/auth/send-otp",
        { phone: phoneNumber }
      );
      
      setIsOtpSent(true);
      toast.success("OTP Sent Successfully");
    } catch (error) {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/verify-otp",
        {
          phone: phoneNumber,
          otp: otpCode,
        }
      );
      // console.log("res-->",res);

      if (res.status === 200) {
        const payload = res.data && (res.data.user || res.data);
        console.log("payload check role --->",payload);
        
        const role = payload?.data.user.role;
        console.log("role is --->", role);
        
        const userObj = { phone: phoneNumber, role, ...(payload || {}) };
        setUser(userObj);
        console.log(">>>>>>>usrobj",userObj);
        console.log(">>>>>>>usrobj",userObj.data.user);
        
        localStorage.setItem('user', JSON.stringify(userObj.data.user));
        toast.success("Login Successful");

        if (role === 'admin') {
          navigate('/admin/add-product');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      toast.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="font-serif text-3xl">Login</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <input
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border border-gray-800 py-2 px-3 w-full"
        type="text"
        placeholder="Enter Phone Number"
        required
        disabled={isOtpSent}
      />

      {isOtpSent && (
        <input
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          className="border border-gray-800 py-2 px-3 w-full"
          type="text"
          placeholder="Enter OTP"
          required
        />
      )}

      <button
        className="bg-black text-white font-light px-8 py-2 mt-4 w-full"
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : isOtpSent
          ? "Verify OTP"
          : "Send OTP"}
      </button>
    </form>
  );
};

export default Login;
