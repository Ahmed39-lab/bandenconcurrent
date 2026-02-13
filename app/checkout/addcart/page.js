"use client";

import { useEffect, useState } from "react";
import StripeWrapper from "../../_components/cart/StripeWrapper";
import Breadcrumbs from "../../_components/generals/breadrumbs";
import { useCartStore } from "../../_components/store/useCartStore";
import CartForm from "../../_components/cart/cartForm";
import Loader from "../../_components/generals/Loading"



export default function cartFormPage() {
     const   data = {
    category: "Add Form informations",
    current: "Secure Checkout",
  }
  const [clientSecret, setClientSecret] = useState(null);

    const { cart } = useCartStore();


  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPrice }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, []);

  if (!clientSecret) return <><Loader /></>;

  return (
  
  <section>
         <div className="max-w-[1200px] mx-auto">
            {/* <h1>{totalPrice}</h1> */}
           <div className="flex flex-col gap-4 px-2 md:px-0">
             <div>
                 
 
                         <Breadcrumbs data={data} />
 
             </div>
             
              <StripeWrapper clientSecret={clientSecret}>
       
  
   <CartForm />
    </StripeWrapper>
            
             </div>
         </div>
    </section>

  );
}
