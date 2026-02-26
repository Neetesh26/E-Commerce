import React from 'react'

const CancelOrder = () => {
  return (
    <div>
         <div className='min-h-[80vh] flex flex-col items-center justify-center gap-4'>
                  <h2 className='text-2xl font-medium'>Payment Cancelled</h2>
                  <p className='text-gray-600'>Your payment was cancelled. You can continue shopping or try placing your order again.</p>
                  <button onClick={()=>window.location.href='/place-order'} className='border px-4 py-2 rounded-sm text-sm font-medium'>Try Again</button>
                </div>
    </div>
  )
}

export default CancelOrder
