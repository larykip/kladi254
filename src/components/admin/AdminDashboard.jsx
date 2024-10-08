'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const router = useRouter();
  //sets the username of the user in session
  const [username, setUsername] = useState('');
  //sets the items fetched in the database
  const [items, setItems] = useState([]);
  //sets the new item to be added to the database
  const [newItem, setNewItem] = useState({ img: '', text: '', stock: 0, price: '' });
  const [editingItem, setEditingItem] = useState(null);
  //const [userId, setUserId] = useState('');
  
  useEffect(() => {
    // Check if user is logged in
    const checkSession = async () => {
      //fetches the session data from the server
      const response = await fetch('/api/auth/session');
      //parses the response to json
      const result = await response.json();
      //if the user is authenticated, set the username
      if (result.authenticated) {
        setUsername(result.user.username);
        //setUserId(result.user.id);
      }
    };
    checkSession();
    fetchItems();
  }, []);

  const fetchItems = async () => {
    // Fetch items from the server
    const response = await fetch(`/api/items`);
    // Parse the response to JSON
    const data = await response.json();
    // Set the items in state
    setItems(data);
  };

  // Handle logout
  const handleLogout = async () => {
    // Send a POST request to the server to logout the user
    await fetch('/api/auth/logout', { method: 'POST' });
    // Clear the username in state
    setUsername('');
    // Redirect to the login page
    router.push('/login');
  };

  // Handle create or update item
  const handleSubmit = async (e) => {
    // Prevent the default form submission
    e.preventDefault();
    // Check if the item is being edited or created
    const method = editingItem ? 'PUT' : 'POST';
    // Send a request to the server to create or update the item
    const url = editingItem ? `/api/items?id=${editingItem._id}` : '/api/items'
    console.log(`This and method is ${method}`);

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newItem }),
    });

    if (response.ok) {
      // Item created successfully and reset the form
      setNewItem({ img: '', text: '', stock: 0, price: '' });
      // Clear the editing item
      setEditingItem(null);
      // Fetch the new items from the server
      fetchItems(); // Refresh items
  } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`); // Display error message to user
  }
  };

  // Handle edit button click
  const handleEdit = (item) => {
    // Set the new item to the item
    setNewItem({ img: item.img, text: item.text, stock: item.stock, price: item.price });
    // Set the item to be edited
    setEditingItem(item);
  };

  // Handle delete item
  const handleDelete = async (id) => {
    // Send a DELETE request to the server
    const response = await fetch(`/api/items?id=${id}`, { method: 'DELETE' });
    // Check if the item was deleted successfully
    if (response.ok) {
      fetchItems(); // Refresh the items list after deletion
    } else {
      const errorData = await response.json();
      console.error('Error deleting item:', errorData.message);
    }
  };
  

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          <p className='mb-4 text-sky-500'>Welcome {username}!</p>
          <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
          <ul>
            <li className="mb-4">
              <Link href="#" className="hover:text-gray-300">Overview</Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="hover:text-gray-300">Stock Management</Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="hover:text-gray-300">Sales Trends</Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="hover:text-gray-300">Price Management</Link>
            </li>
            <li className="mb-4">
              <Link href="#" className="hover:text-gray-300">Orders</Link>
            </li>
            <li className="mb-4">
              <Link href={`/admin/settings`} className="hover:text-gray-300">Settings</Link>
            </li>
          </ul>
        </div>
        <div>
          <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded mt-8 hover:bg-red-600">Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">Manage Items</h2>

        {/* Item Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
          <div className="mb-4">
            <label className="block mb-1">Image URL</label>
            <input 
              type="text" 
              value={newItem.img} 
              onChange={(e) => setNewItem({ ...newItem, img: e.target.value })} 
              className="border p-2 w-full" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Product Name</label>
            <input 
              type="text" 
              value={newItem.text} 
              onChange={(e) => setNewItem({ ...newItem, text: e.target.value })} 
              className="border p-2 w-full" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Stock</label>
            <input 
              type="text" 
              value={newItem.stock} 
              onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })} 
              className="border p-2 w-full" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Price</label>
            <input 
              type="text" 
              value={newItem.price} 
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} 
              className="border p-2 w-full" 
              required 
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
        </form>

        {/* Item Management Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
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
              { items.length > 0 && items.map(item => (
                <tr key={item._id}>
                  <td className="p-3 border-b">{item.text}</td>
                  <td className="p-3 border-b">{item.stock}</td> {/* Placeholder for Stock */}
                  <td className="p-3 border-b">{item.price}</td>
                  <td className="p-3 border-b">
                    <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white py-1 px-4 rounded ml-2 hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
