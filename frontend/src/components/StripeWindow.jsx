import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";

const CardInputForm = ({
  cartItemsToProcess,
  setCartItemsToProcess,
  setRequiresCard,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setSubmitting(true);

    try {
      const pmResult = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (pmResult.error) {
        setError(pmResult.error.message);
        setSubmitting(false);
        return;
      }

      const paymentMethodId = pmResult.paymentMethod.id;
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const payload = {
        product: cartItemsToProcess,
        userData: user,
        paymentMethodId,
      };
      // console.log("payload.product",payload.product);
      

      const resp = await axiosInstance.post(
        "/payment/create-payment-intent",
        payload
      );
      // console.log("resp.data",resp.data);
      // console.log("resp",resp);
      const { clientSecret } = resp.data;

      const confirm = await stripe.confirmCardPayment(clientSecret);

      if (confirm.error) {
        setError(confirm.error.message);
      } else if (confirm.paymentIntent.status === "succeeded") {
        navigate("/orders?success=true", { state: { products: payload.product } });
      }
    } catch (err) {
      setError("Payment failed");
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleCardSubmit} className="max-w-md mx-auto">
      {error && (
        <div className="text-red-500 mb-4 p-3 bg-red-100 rounded">
          {error}
        </div>
      )}

      <CardElement className="p-4 border rounded" />

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full mt-4 bg-black text-white px-6 py-2 rounded"
      >
        {submitting ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default CardInputForm;   