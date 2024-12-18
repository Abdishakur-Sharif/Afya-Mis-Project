import React, { useState } from "react";
import login from "../assets/Images/login.jpg";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { doSignInWithEmailAndPassword, getUserRole } from "../firebase/auth";
import { useAuth } from "../context/authcontext";

function LogIn() {
  const navigate = useNavigate(); // Initialize navigate
  const { userLoggedIn, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handles the email and password sign-in
  const onSubmit = async (e) => {
  e.preventDefault();
  setIsSigningIn(true);
  setErrorMessage(""); // Clear any previous error messages

  // Validate input fields
  if (!email || !password) {
    setErrorMessage("Please fill in all fields");
    return;
  }
  try {
    // Firebase sign-in call
    const userCredential = await doSignInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Retrieve the user role from Firestore
    const role = await getUserRole(user);

    // Redirect based on user role
    if (role === "admin") {
      navigate('/admindashboard');
    } else if (role === "doctor") {
      navigate('/doctordashboard');
    } else if (role === "lab-staff") {
      navigate('/lab-dashboard');
    } else if (role === "pharmacy") {
      navigate('/pharmacy-dashboard');
    } else if (role === "receptionist") {
      navigate('/receptionist-dashboard');
    } else {
      navigate('/'); // Default to home page if no role is found or it's a generic role
    }

    // Clear input fields after successful login
    setEmail("");
    setPassword("");

  } catch (error) {
    setErrorMessage(error.message); // Display error message
  } finally {
    setIsSigningIn(false); // Stop loading state
  }
};

// Display a loading message while authentication status is being determined
if (loading) {
  return <div>Loading...</div>;
}

  return (
    <div>
      <div className="w-full mb-8">
        <p>{}</p>
        <h1 className="text-5xl font-bold text-blue-500 relative ml-20">
          Afya 
        </h1>
        <div className="w-full h-0.5 bg-gray-400 mt-2"></div>
      </div>

      <div className="w-full min-h-screen flex justify-center items-center py-12">
        <div className="w-full max-w-4xl bg-white shadow-lg flex flex-col md:flex-row items-center rounded-lg overflow-hidden">
          <div className="relative w-full md:w-1/2 h-48 md:h-auto">
            <img src={login} alt="login" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">LogIn</h3>
            <p className="text-sm mb-4">Welcome back! Please enter your details</p>

            <form onSubmit={onSubmit} className="flex flex-col">
              <input
                type="text"
                placeholder="Enter Your Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="placeholder:text-black bg-transparent py-2 my-2 border-b border-black focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="placeholder:text-black bg-transparent py-2 my-2 border-b border-black focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSigningIn}
                className="text-white bg-blue-500 py-2 my-4 w-full rounded hover:bg-purple-700"
              >
                Log In
              </button>

              {/* Error Message */}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              <div className="text-sm mt-2">
                <p className="mb-2">
                  <a href="#" className="text-blue-600 hover:underline"
                  onClick={() => navigate('/forgot-password')}
                  >Forgot Password?</a>
                </p>
                <p>
                  Don't have an Account?{" "}
                  <a 
                    href="#" 
                    className="text-blue-600 hover:underline" 
                    onClick={() => navigate('/registration')} // Navigate to Registration form
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
