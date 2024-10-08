'use client'
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

const SignIn = () => {
    const router = useRouter()
    
  const handleSubmit = async (e) => {
    // Prevent the form from being submitted
    e.preventDefault();
    
    // Get the form data
    const formData = new FormData(e.target);
    // Convert the form data to an object
    const data = Object.fromEntries(formData);

    // Basic validation for empty fields
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Convert the data object to a JSON string
        body: JSON.stringify({
            action: 'login',
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      // Check if the request was successful
      if (response.ok) {
        if (result.isAdmin) {
          toast.success('Login successful! Redirecting to Admin Dashboard...', {
            onClose: () => router.push('/admin'),
            autoClose: 2000
          });
        } else {
          toast.success('Login successful! Redirecting to Homepage...', {
            onClose: () => router.push('/'),
            autoClose: 2000
          });
        }
      } else {
        toast.error(`Failed to login: ${result.message}`);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Failed to log in');;
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account? 
          <a href="/join" className="text-blue-500 hover:underline"> Create an account</a>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignIn;
