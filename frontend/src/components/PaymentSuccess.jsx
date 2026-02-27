import React from 'react'

const PaymentSuccess = () => {
  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center gap-4'>
      <h2 className='text-2xl font-medium'>Payment Successful!</h2>
      <p className='text-gray-600'>Thank you for your purchase. Your order has been placed successfully.</p>
      <button onClick={()=>window.location.href='/orders'} className='border px-4 py-2 rounded-sm text-sm font-medium'>View Orders</button>
    </div>
  )
}

export default PaymentSuccess
