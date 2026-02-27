import React from 'react'
import { Routes , Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from '../src/pages/Home';
import Collection from '../src/pages/Collection';
import About from '../src/pages/About';
import Contact from '../src/pages/Contact';
import Product from '../src/pages/Product';
import Cart from '../src/pages/Cart';
import Login from '../src/pages/Login';
import PlaceOrder from '../src/pages/PlaceOrder';
import Orders from '../src/pages/Orders';
import AdminAddProduct from '../src/pages/AdminAddProduct';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer, toast } from 'react-toastify';
import PaymentSuccess from './components/PaymentSuccess';
import CancelOrder from './components/CancelOrder';
import StripeWindow from './components/StripeWindow';
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

      <Navbar/>
      <ToastContainer />
      <SearchBar />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/stripe' element={<StripeWindow />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={< Contact/>} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/place-order'
            element={
              <PrivateRoute>
                <PlaceOrder />
              </PrivateRoute>
            }
          />
          <Route
            path='/orders'
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path='/orders/success'
            element={
              <PrivateRoute>
                <PaymentSuccess />
              </PrivateRoute>
            }
          />
          <Route
            path='/orders/cancel'
            element={
              <PrivateRoute>
                <CancelOrder />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/add-product'
            element={
              <PrivateRoute adminOnly>
                <AdminAddProduct />
              </PrivateRoute>
            }
          />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
