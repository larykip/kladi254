'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

const AdminDashboard = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')

  useEffect(() => {
    const checkSession = async() => {
      const response = await fetch('/api/auth/session')
      const result = await response.json()
      if(result.authenticated) {
        setUsername(result.user.username)
      }
    }
    checkSession()
  }, [])

  //handles logout
  const handleLogout = async() => {
    await fetch('/api/auth/logout', { method: 'POST'})
    setUsername('')
    router.push('/login')
  }
    return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          <p className='mb-4 text-sky-500'>Welcome {username}!</p>
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <ul>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-300">Overview</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-300">Stock Management</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-300">Sales Trends</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-300">Price Management</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-300">Orders</a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:text-gray-300">Settings</a>
          </li>
        </ul>
        </div>
        <div>
        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded mt-8 hover:bg-red-600">Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">Overview</h2>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6">
          {/* Stock Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Stock Summary</h3>
            <p>Total Products: <span className="font-bold">240</span></p>
            <p>Out of Stock: <span className="font-bold text-red-600">15</span></p>
          </div>

          {/* Sales Trends */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Sales Trends</h3>
            <p>Total Sales This Week: <span className="font-bold">$5,230</span></p>
            <p>Best Seller: <span className="font-bold">Summer Dress</span></p>
          </div>

          {/* Price Management */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Price Management</h3>
            <p>Price Changes Today: <span className="font-bold">4</span></p>
            <p>Last Change: <span className="font-bold">Winter Jacket</span></p>
          </div>
        </div>

        {/* Stock Management Table */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-6">Manage Stock</h3>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b-2 p-3">Product</th>
                <th className="border-b-2 p-3">Stock</th>
                <th className="border-b-2 p-3">Price</th>
                <th className="border-b-2 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b">Summer Dress</td>
                <td className="p-3 border-b">32</td>
                <td className="p-3 border-b">$49.99</td>
                <td className="p-3 border-b">
                  <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">Edit</button>
                </td>
              </tr>
              <tr>
                <td className="p-3 border-b">Winter Jacket</td>
                <td className="p-3 border-b">12</td>
                <td className="p-3 border-b">$79.99</td>
                <td className="p-3 border-b">
                  <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">Edit</button>
                </td>
              </tr>
              <tr>
                <td className="p-3 border-b">Sneakers</td>
                <td className="p-3 border-b">45</td>
                <td className="p-3 border-b">$59.99</td>
                <td className="p-3 border-b">
                  <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;