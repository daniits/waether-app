import React from 'react'
import SP from "../../../public/spinner.gif"
import Image from 'next/image'

const Sipner = () => {
  return (
    <div><Image className='w-[200px] m-auto block' src={SP} alt='loading.....' /></div>
  )
}

export default Sipner