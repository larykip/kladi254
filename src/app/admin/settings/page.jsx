'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [users, setUsers] = useState([]);

  // Fetch users on load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        console.log('Fetched users:', data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const updateAdminStatus = async (userId, isAdmin) => {
    try {
      const res = await fetch(`/api/users/${userId}/admin`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin }),
      });

      if (res.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isAdmin } : user
          )
        );
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h1>Admin Management</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id} style={{ marginBottom: '10px' }}>
            <span>
              {user.username} - {user.email} -{' '}
              <strong>{user.isAdmin ? 'Admin' : 'Regular User'}</strong>
            </span>
            <div style={{ marginLeft: '10px' }}>
              {!user.isAdmin && (
                <button
                  onClick={() => updateAdminStatus(user._id, true)}
                  style={{
                    backgroundColor: '#32CD32',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  Promote to Admin
                </button>
              )}
              {user.isAdmin && (
                <button
                  onClick={() => updateAdminStatus(user._id, false)}
                  style={{
                    backgroundColor: '#FF6347',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                >
                  Demote to User
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
