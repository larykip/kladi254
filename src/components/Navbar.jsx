'use client'
import React, { useState, useEffect } from 'react'
import { Heart, Menu, Search, ShoppingCart, UserRound, X } from 'lucide-react'
import Link from 'next/link'
import ButtonComponent from './ButtonComponent'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const router = useRouter()

  const handleClick = () => {
    setIsOpen(prev => !prev)
  }

  const handleDropdownToggle = () => {
    setDropdownOpen(prev => !prev)
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setAuthenticated(false)
    setUsername('')
    setAvatarUrl('') // Clear avatar on logout
    router.push('/login')
  }

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch('/api/auth/session')
      const result = await response.json()
      if (result.authenticated) {
        setAuthenticated(true)
        setUsername(result.user.username)

        // Fetch a random avatar or use a specific avatar service like RoboHash, Avatarify, etc.
        const randomAvatar = `https://api.dicebear.com/6.x/avataaars/svg?seed=${result.user.username}`
        setAvatarUrl(randomAvatar)
      }
    }
    checkSession()
  }, [])

  return (
    <div className='flex flex-col'>
      <div className='flex justify-evenly md:justify-between items-center md:px-5 h-16 lg:px-12 text-white bg-black'>
        <div className='flex min-w-[160px] justify-between md:space-x-8 lg:space-x-14 items-center'>
          <div className='relative flex lg:hidden '>
            <Menu onClick={handleClick}/>
            {isOpen && (
              <div className='text-black absolute w-[300px] bg-slate-300 left-0 bottom-[-60px] z-10'>
                <div className='relative flex'>
                  <Link href='/men'><ButtonComponent label={'Men'}/></Link>
                  <Link href='/women'><ButtonComponent label={'Women'}/></Link>
                </div>
                <div onClick={handleClick} className='bg-black cursor-pointer text-white absolute h-[24px] top-0 right-[-28px]'><X/></div>
              </div>
            )}
          </div>
          <h1>Logo!</h1>
          <div className='hidden lg:flex lg:space-x-14'>
            <Link href='/men'><ButtonComponent label={'Men'}/></Link>
            <Link href='/women'><ButtonComponent label={'Women'}/></Link>
          </div>
        </div>
        <div className='flex w-14 md:bg-gray-300 md:rounded-2xl px-4 items-center h-10 md:w-[400px] lg:w-[600px]'>
          <input className='hidden md:flex bg-gray-300 rounded-2xl w-full h-full outline-none' type='text' placeholder='Search' />
          <Search className='cursor-pointer' />
        </div>
        <div className='flex min-w-[160px] justify-between md:space-x-8 lg:space-x-14 relative'>
          <div className='flex items-center'>
            {authenticated ? (
              <div className='relative'>
                <div
                  className='cursor-pointer'
                  onClick={handleDropdownToggle}
                >
                  {/* <p>Welcome {username}</p> */}
                  <img
                    src={avatarUrl || '/default-avatar.png'} // Display avatar or default avatar if none is available
                    alt='User Avatar'
                    className='w-8 h-8 rounded-full'
                  />
                </div>
                {dropdownOpen && (
                  <div className='absolute right-0 bg-white text-black shadow-lg rounded-lg mt-2 w-48'>
                    <Link href='/profile' className='block px-4 py-2 hover:bg-gray-100'>Profile</Link>
                    <button
                      onClick={handleLogout}
                      className='w-full text-left px-4 py-2 hover:bg-gray-100'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='cursor-pointer' onClick={handleDropdownToggle}>
                <UserRound />
                {dropdownOpen && (
                  <div className='absolute right-0 bg-white text-black shadow-lg rounded-lg mt-2 w-48'>
                    <Link href='/login' className='block px-4 py-2 hover:bg-gray-100'>Login</Link>
                    <Link href='/join' className='block px-4 py-2 hover:bg-gray-100'>Register</Link>
                  </div>
                )}
              </div>
            )}
          </div>
          <Link href='/saved'><Heart /></Link>
          <ShoppingCart />
        </div>
      </div>
      <div className='hidden lg:flex justify-center items-center h-16 md:px-6 lg:px-12 text-white bg-gray-700'>
        <p>Welcome to your fastest designer hub</p>
      </div>
    </div>
  )
}

export default Navbar
