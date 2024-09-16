import Image from 'next/image'
import React from 'react'

const logos = [
    {
        url: '/brands/adidas.png'
    },
    {
        url: '/brands/Aesop.png'
    },
    {
        url: '/brands/Jordan.png'
    },
    {
        url: '/brands/Chanel.png'
    },
    {
        url: '/brands/dolce.png'
    },
    {
        url: '/brands/puma.png'
    },
    {
        url: '/brands/Vuitton.png'
    }
]

const BrandsLogo = () => {
  return (
    <div className=' justify-centerflex flex-col mt-8'>
        <div className='text-center'>
            <h1 className='font-bold text-3xl'>Top Brands</h1>
        </div>
        <div className='flex mt-24 gap-6 justify-center'>
      { logos.map((logo, index) => (
        <div key={index}>
            <Image src={logo.url} alt='brand logo' width={200} height={200}/>
        </div>
      )) }
    </div>
    </div>
  )
}

export default BrandsLogo
