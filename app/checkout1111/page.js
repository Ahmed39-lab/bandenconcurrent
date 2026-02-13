import React from 'react'
import CheckoutForm from '../_components/cart/checkOut'
import Breadcrumbs from '../_components/generals/breadrumbs'

export default function page() {
   const   data = {
    category: "Form",
    current: "Checkout Form",
  }

  return (
    <section>
         <div className="max-w-[1200px] mx-auto">
           <div className="flex flex-col gap-4 px-2 md:px-0">
             <div>
                 
 
                         <Breadcrumbs data={data} />
 
             </div>
             <CheckoutForm  />
            
             </div>
         </div>
    </section>
  )
}
