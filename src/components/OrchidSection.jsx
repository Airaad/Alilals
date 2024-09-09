import React from 'react'
import { ButtonComponent } from './ButtonComponent'
import { FaShoppingBag } from "react-icons/fa";

const OrchidSection = () => {
  return (
    <div className='flex items-center justify-between py-6 px-5 md:px-8 lg:justify-evenly'>
        <div className='flex items-center gap-5'>
            <FaShoppingBag className='text-5xl text-[#636363]'/>
            <div className='w-[70%]'>
            <h2 className='text-xl font-semibold text-[#44A05B]'>Buy Orchids</h2>
            <p className='text-sm'>Use our form to estimate the initial cost of renovation or installation.</p>
            </div>
        </div>
        <div>
            <ButtonComponent text='Buy Now'/>
        </div>
    </div>
  )
}

export default OrchidSection