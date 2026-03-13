import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { axiosInstance } from "../config/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(ShopContext);

  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.post("/v1/auth/send-otp", { email });
      setIsOtpSent(true);
      toast.success("OTP Sent Successfully");
    } catch (error) {
      toast.error("Failed to send OTP");
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstance.post("/v1/auth/verify-otp", {
        email,
        otp: otpCode,
      });

      if (res.status === 200) {
        const payload = res.data.data;
        const role = payload.user.role;
        localStorage.setItem("token", payload.token);

        const userObj = { email, role, ...payload };
        setUser(userObj);
        localStorage.setItem("user", JSON.stringify(payload.user));

        toast.success("Login Successful");

        if (role === "admin") navigate("/admin/add-product");
        else navigate("/");
      }
    } catch (error) {
      // console.log(error);
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
      {/* Notice */}
<div className="w-full bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm p-3 rounded">
  <p>
    <strong>Note:</strong> Email OTP authentication may not work in the demo
    environment because the email service requires a verified domain on the
    production server.  
  </p>
  <p className="mt-1">
    For quick access, please use <strong>Google Authentication</strong> below to
    continue.
  </p>
</div>
      {/* Title */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="font-serif text-3xl">Login</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Email Input */}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-800 py-2 px-3 w-full"
        type="email"
        placeholder="Enter Email"
        required
        disabled={isOtpSent}
      />

      {/* OTP Input */}
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

      {/* OTP Button */}
      <button
        className="bg-black text-white font-light px-8 py-2 mt-4 w-full"
        type="submit"
        disabled={loading}
      >
        {loading ? "Processing..." : isOtpSent ? "Verify OTP" : "Send OTP"}
      </button>

      {/* OR Divider */}
      <div className="flex items-center w-full my-2">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500 text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={() => {
          window.location.href = "https://backendbi.onrender.com/api/v1/auth/google";
        }}
        className="flex items-center justify-center gap-3 border border-gray-300 py-2 px-4 w-full hover:bg-gray-100 transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5 h-5"
        />
        <span className="text-sm font-medium">Continue with Google</span>
      </button>
    </form>
  );
};

export default Login;