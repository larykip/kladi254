'use client'
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

const Join = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    //prevents form submission/loading a new page
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Basic validation for empty fields
    if (!data.username || !data.email || !data.password || !data.confirmPassword) {
      toast.error('Please fill out all fields', { icon: '' });
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match', { icon: '' });
      return;
    }

    try {
      const response = await fetch('/api/auth/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Registration successful! Redirecting to Login page...', {
          onClose: () => router.push('/login'),
          autoClose: 1500,
          icon: '',
        });
      } else {
        toast.error(`Failed to create user: ${result.message}`, { icon: '' });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to sign up!', { icon: '' });
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

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
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already a member? <a href="/login" className="text-blue-500 hover:underline">Sign In</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Join;
