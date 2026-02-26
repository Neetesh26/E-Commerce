import React, { useContext, useState } from 'react';
// Stripe libraries for Elements
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

// load with your publishable key (you could place in env or config)
const stripePromise = loadStripe('pk_test_51T4KDe1OJnHAVnv6Xi6jIqG1HcK3WGp6WPfUNm9Z5Qm8a4t9E5snuOLLQpCZhmg2SFOPiFncSQx1XqnRIQPHw54r008iXQVwCa');

const PlaceOrder = () => {
  const [method, setmethod] = useState('cod');
  const { cartItems, products, navigate, } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);

  // state for stripe flow
  const [clientSecret, setClientSecret] = useState('');
  const [requiresCard, setRequiresCard] = useState(false);
  const [stripeCustomerId, setStripeCustomerId] = useState('');
  
  const prepareCartItems = () => {
    const items = [];

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const product = products.find(p => p._id === itemId);
          if (product) {
            items.push({
              id: product._id,
              name: product.name,
              price: product.price,
            });
          }
        }
      }
    }

    return items;
  };
  
  const handleCheckout = async () => {
    if (method === 'cod') {
      navigate('/orders');
      return;
    }

    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const payload = {
        product: prepareCartItems(),
        userData: user,
      };
      console.log("payload....",payload);
      

      if (method === 'stripe') {
        // first call to ensure customer exists and get customerId
        console.log("inside method correetlh",);
        

        if (!user.stripeCustomerId) {
          const response = await axios.post(
          'http://localhost:5000/api/payment/create-checkout-session',
          payload
        );
        console.log("response:", response);
        
        const { url } = response.data;
        window.location.href = url;
        }

        const response = await axios.post(
          'http://localhost:5000/api/payment/create-payment-intent',
          payload
        );
        console.log("after api call correetlh",response);
        const { customerId } = response.data;

        // persist stripe customer id locally so next time we can reuse
        if (customerId) {
          const stored = JSON.parse(localStorage.getItem('user') || '{}');
          stored.stripeCustomerId = customerId;
          localStorage.setItem('user', JSON.stringify(stored));
          setStripeCustomerId(customerId);
          
          navigate('/orders/success');
        }

        setRequiresCard(true);
       
      } else {
        // const response = await axios.post(
        //   'http://localhost:5000/api/payment/create-checkout-session',
        //   payload
        // );
        // console.log("response:", response);
        
        // const { url } = response.data;
        // window.location.href = url;
      }
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  // component rendered when the clientSecret is available and user needs to enter card info
  const CardInputForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [submitting, setSubmitting] = useState(false);

    const handleCardSubmit = async (e) => {
      e.preventDefault();
      if (!stripe || !elements) {
        return;
      }
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        return;
      }
      setSubmitting(true);

      // create PaymentMethod on the client
      const pmResult = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (pmResult.error) {
        console.error(pmResult.error);
        setSubmitting(false);
        return;
      }

      const paymentMethodId = pmResult.paymentMethod.id;
      // send paymentMethodId to backend to attach to customer and create PaymentIntent
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const payload = {
        product: prepareCartItems(),
        userData: user,
        paymentMethodId,
      };

      try {
        const resp = await axios.post('http://localhost:5000/api/payment/create-payment-intent', payload);
        const { clientSecret: cs } = resp.data;
        // confirm the payment using the client secret and the payment method
        const confirm = await stripe.confirmCardPayment(cs, { payment_method: paymentMethodId });
        console.log("confirm",confirm);
        
        if (confirm.error) {
          console.error(confirm.error);
        } else if (confirm.paymentIntent && confirm.paymentIntent.status === 'succeeded') {
          navigate('/orders?success=true');
        }
      } catch (err) {
        console.error(err);
      }

      setSubmitting(false);
    };

    return (
      <form onSubmit={handleCardSubmit} className="max-w-md mx-auto">
        <CardElement className="p-4 border" />
        <button
          type="submit"
          disabled={!stripe || submitting}
          className="mt-4 bg-black text-white px-6 py-2"
        >
          {submitting ? 'Processing...' : 'Pay'}
        </button>
      </form>
    );
  };


  if (requiresCard && clientSecret) {
    // show the card element once a client secret is available and Stripe
    // informs us a card is required.
    return (
      <div className="pt-10">
        <Elements stripe={stripePromise}>
          <CardInputForm />
        </Elements>
      </div>
    );
  }

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'}/>

          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={()=>setmethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setmethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setmethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button 
              onClick={handleCheckout} 
              disabled={loading}
              className='bg-black text-white px-16 py-3 text-sm'
            >
              {loading ? 'Processing...' : 'PLACE ORDER'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;