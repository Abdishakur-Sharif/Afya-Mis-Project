import React, { useState } from "react";
import { FaRegUser, FaCalendarAlt, FaFileAlt, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth";  // Import the doSignOut function

function NavigationBar({ onSelectSection }) {
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Logout function
  const handleLogout = async () => {
    try {
      // Sign out from Firebase Authentication
      await doSignOut();
      // Redirect to home page after successful logout
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-6 space-y-4 flex flex-col lg:w-1/4 min-h-screen">
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden text-white p-2 rounded-full bg-blue-700 hover:bg-blue-500 focus:outline-none transition duration-300"
      >
        ☰
      </button>

      {/* Menu items - Mobile view */}
      {isMobileMenuOpen && (
        <div className="flex flex-col space-y-4 mt-4 lg:hidden">
          <button onClick={() => onSelectSection("register")} className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300 flex items-center">
            <FaRegUser className="inline mr-2" /> Register Patient
          </button>
          <button onClick={() => onSelectSection("schedule")} className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300 flex items-center">
            <FaCalendarAlt className="inline mr-2" /> Schedule Appointment
          </button>
          <button onClick={() => onSelectSection("records")} className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300 flex items-center">
            <FaFileAlt className="inline mr-2" /> Patient Records
          </button>
          <button onClick={() => onSelectSection("appointments")} className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300 flex items-center">
            <FaClipboardList className="inline mr-2" /> Appointments
          </button>
          {/* Logout button */}
          <button onClick={handleLogout} className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300 flex items-center">
            <FaSignOutAlt className="inline mr-2" /> Logout
          </button>
        </div>
      )}

      {/* Menu items - Desktop view */}
      <div className="hidden lg:flex flex-col space-y-4">
        <button onClick={() => onSelectSection("register")} className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300 flex items-center">
          <FaRegUser className="inline mr-2" /> Register Patient
        </button>
        <button onClick={() => onSelectSection("schedule")} className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300 flex items-center">
          <FaCalendarAlt className="inline mr-2" /> Schedule Appointment
        </button>
        <button onClick={() => onSelectSection("records")} className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300 flex items-center">
          <FaFileAlt className="inline mr-2" /> Patient Records
        </button>
        <button onClick={() => onSelectSection("appointments")} className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300 flex items-center">
          <FaClipboardList className="inline mr-2" /> Appointments
        </button>
        {/* Logout button */}
        <button onClick={handleLogout} className="w-full text-left p-3 rounded-lg text-lg hover:bg-blue-500 focus:outline-none transition duration-300 flex items-center">
          <FaSignOutAlt className="inline mr-2" /> Logout
        </button>
      </div>
    </nav>
  );
}

export default NavigationBar;
