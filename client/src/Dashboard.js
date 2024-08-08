

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Graph from './components/Graph';
import Form from './components/Form';

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear user authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Navigate to the login page
    navigate("/");
  };

  return (
    <div>
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">Expense Tracker</h1>

        {/* grid columns */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Chart */}
          <Graph />
          {/* Form */}
          <Form />
        </div>
        <button onClick={handleLogout} className="mt-4 py-2 px-4 bg-red-500 text-white rounded">Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
