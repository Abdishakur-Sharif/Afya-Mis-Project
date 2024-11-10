// src/components/AdminAuth.jsx
import React, { useState } from 'react';

function AdminAuth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      window.location.href = '/dashboard';
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-primary text-white">
      <div className="p-6 bg-white rounded shadow-md w-80 text-primary">
        <h2 className="text-2xl mb-4">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full p-2 bg-primary text-white rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminAuth;
