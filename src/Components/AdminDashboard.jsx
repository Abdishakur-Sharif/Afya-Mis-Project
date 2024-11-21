import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const [analyticsData] = useState({
    doctors: {
      total: 45,
      recent: 5,
      chart: [
        { month: "Jan", count: 30 },
        { month: "Feb", count: 35 },
        { month: "Mar", count: 40 },
        { month: "Apr", count: 45 },
      ],
    },
    labtechs: {
      total: 22,
      recent: 3,
      chart: [
        { month: "Jan", count: 15 },
        { month: "Feb", count: 18 },
        { month: "Mar", count: 20 },
        { month: "Apr", count: 22 },
      ],
    },
    patients: {
      total: 350,
      recent: 25,
      chart: [
        { month: "Jan", count: 250 },
        { month: "Feb", count: 290 },
        { month: "Mar", count: 320 },
        { month: "Apr", count: 350 },
      ],
    },
    staff: {
      total: 60,
      recent: 8,
      chart: [
        { month: "Jan", count: 45 },
        { month: "Feb", count: 50 },
        { month: "Mar", count: 55 },
        { month: "Apr", count: 60 },
      ],
    },
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data (e.g., token)
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    // Redirect to the home page
    navigate("/");
  };

  const dashboardItems = [
    {
      title: "Doctors Management",
      description: "Comprehensive doctor profile management",
      route: "/doctors",
      icon: "👩‍⚕️",
      stats: analyticsData.doctors,
    },
    {
      title: "Laboratory Management",
      description: "Advanced lab technician tracking",
      route: "/labtechs",
      icon: "🔬",
      stats: analyticsData.labtechs,
    },
    {
      title: "Staff Coordination",
      description: "Strategic personnel management",
      route: "/staffs",
      icon: "👥",
      stats: analyticsData.staff,
    },
    {
      title: "User Access Control",
      description: "Secure role-based permissions",
      route: "/registration",
      icon: "🔐",
      stats: { total: 100, recent: 15 },
    },
    {
      title: "Patient Care Center",
      description: "Holistic patient record management",
      route: "/patients",
      icon: "❤️",
      stats: analyticsData.patients,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-10">
      <div className="container mx-auto">
        {/* Header with Logout Button */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-extralight tracking-tight text-slate-800">
            Administrative Dashboard
          </h2>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-500 text-white rounded-lg 
                       hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Dashboard Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 
                         hover:shadow-xl transition-all duration-300 
                         transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{item.icon}</span>
                  <h3 className="text-xl font-semibold text-slate-800">
                    {item.title}
                  </h3>
                </div>
                <p className="text-slate-600 text-sm mb-4 h-12">
                  {item.description}
                </p>

                {item.stats && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Total: {item.stats.total}</span>
                      <span>Recent: {item.stats.recent}</span>
                    </div>
                    {item.stats.chart && (
                      <div className="h-20 mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={item.stats.chart}>
                            <XAxis dataKey="month" hide />
                            <YAxis hide />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="count"
                              stroke="#6366f1"
                              strokeWidth={2}
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                )}

                <Link
                  to={item.route}
                  className="block w-full text-center py-3 px-4 
                             bg-gradient-to-r from-indigo-500 to-blue-600 
                             text-white rounded-lg 
                             hover:from-indigo-600 hover:to-blue-700 
                             transition-colors duration-300"
                >
                  Manage {item.title.replace("Management", "")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
