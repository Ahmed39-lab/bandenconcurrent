import React from 'react'
import Breadcrumbs from '../_components/generals/breadrumbs'
import CartContent from '../_components/cart/cartContent'

function page() {
  return (
   <section>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-4 px-2 md:px-0">
            <div>
                

                        <Breadcrumbs />

            </div>
            <CartContent />
           
            </div>
        </div>
   </section>
  )
}

export default page