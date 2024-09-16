import React from 'react'
import { Button } from './ui/button'

const ButtonComponent = ({label}) => {
  return (
    <Button className='bg-white hover:bg-red-300 text-black rounded-xl'>{label}</Button>
  )
}

export default ButtonComponent
