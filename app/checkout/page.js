"use client";

import CheckoutForm from '../_components/cart/CheckoutForm';
import Breadcrumbs from '../_components/generals/breadrumbs';
import { useCartStore } from "../_components/store/useCartStore";

export default function CheckoutPage() {
     const   data = {
    category: "Form",
    current: "Checkout Form",
  }
  
    // const { cart } = useCartStore();


  // const totalPrice = cart.reduce(
  //   (total, item) => total + item.price * item.qty,
  //   0
  // );

  // useEffect(() => {
  //   fetch("/api/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ amount: totalPrice }),
  //   })
  //     .then(res => res.json())
  //     .then(data => setClientSecret(data.clientSecret));
  // }, []);

  // if (!clientSecret) return <p>Loading Stripe form...</p>;

  return (
  
  <section>
         <div className="max-w-[1200px] mx-auto">
       
           <div className="flex flex-col gap-4 px-2 md:px-0">
             <div>
                 
 
                         <Breadcrumbs data={data} />
 
             </div>
              <CheckoutForm />
              {/* <StripeWrapper clientSecret={clientSecret}>
       
      <CheckoutForm />
    </StripeWrapper> */}
            
             </div>
         </div>
    </section>

  );
}
