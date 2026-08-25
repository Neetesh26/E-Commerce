import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "../src/pages/Home";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";

// Lazy loaded routes
const Collection = lazy(() => import("../src/pages/Collection"));
const About = lazy(() => import("../src/pages/About"));
const Contact = lazy(() => import("../src/pages/Contact"));
const Product = lazy(() => import("../src/pages/Product"));
const Cart = lazy(() => import("../src/pages/Cart"));
const Login = lazy(() => import("../src/pages/Login"));
const PlaceOrder = lazy(() => import("../src/pages/PlaceOrder"));
const Orders = lazy(() => import("../src/pages/Orders"));
const AdminAddProduct = lazy(() => import("../src/pages/AdminAddProduct"));
const PaymentSuccess = lazy(() => import("./components/PaymentSuccess"));
const CancelOrder = lazy(() => import("./components/CancelOrder"));
const StripeWindow = lazy(() => import("./components/StripeWindow"));
const OAuthSuccess = lazy(() => import("./pages/OAuthSuccess"));
const AdminDashboard = lazy(() => import("./Admin/AdminDashboard"));
const AdminProducts = lazy(() => import("./Admin/AdminProducts"));
const AdminOrders = lazy(() => import("./Admin/AdminOrders"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Working = lazy(() => import("./pages/Working"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
  </div>
);

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <ToastContainer />
      <SearchBar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stripe" element={<StripeWindow />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oAuth-success" element={<OAuthSuccess />} />
          <Route path="/profile" element={<PrivateRoute><Profile /> </PrivateRoute> } />
          <Route
            path="/place-order"
            element={
              <PrivateRoute>
                <PlaceOrder />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders/success"
            element={
              <PrivateRoute>
                <PaymentSuccess />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders/cancel"
            element={
              <PrivateRoute>
                <CancelOrder />
              </PrivateRoute>
            }
          />

          <Route path="/working" element={<Working />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                <AdminDashboard />
              </PrivateRoute>
            }
          >
            <Route path="products" element={ <AdminProducts/> } />
            <Route path="add-product" element={<AdminAddProduct />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
