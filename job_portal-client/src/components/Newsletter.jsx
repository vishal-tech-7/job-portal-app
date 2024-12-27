import React from 'react';
import { FaEnvelopeOpenText } from "react-icons/fa6"

const Newsletter = () => {
  return (
    <div>
        <div>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
        <FaEnvelopeOpenText />
        Email me for jobs
        </h3>
        <p className='text-primary/75 text-base mb-4'></p>

        <div className='w-full space-y-4'>
            <input type="email" name='email' id='email' placeholder='name@email.com' className='w-full block py-2 pl-3 border focus:outline-none'/>
            <input type="submit" value={"Subscribe"} className='w-full blocl py-2 pl-3 border focus:outline-none'/>

        </div>

        </div>
     
    </div>
  )
}

export default Newsletter
