import React from 'react'
import { Button } from './ui/button'
import PreviewComponent from './PreviewComponent'

const Preview = () => {
  return (
    <div>
      <div className='flex flex-col text-center items-center justify-center bg-amber-500'>
        <div className='uppercase font-semibold px-10 py-2 rounded-3xl bg-white text-2xl md:text-3xl mt-8'>Final Clearance</div>
        <h1 className='uppercase text-4xl md:text-5xl font-extrabold mt-3 md:mt-8'>New Stocks Added!</h1>
        <h2 className='uppercase text-2xl md:text-4xl font-semibold mt-3 md:mt-8'>Up to 60% off sale</h2>
        <p className='font-thin text-xs mt-3 md:mt-8 mb-8 md:mb-8'>Limited time only. Applicable on selected styles only. </p>
      </div>
      <div className='flex flex-col justify-center items-center bg-amber-500 p-5'>
        <PreviewComponent/>
        <Button className='bg-white mt-8 w-24'>View All</Button>
      </div>
    </div>
  )
}

export default Preview
