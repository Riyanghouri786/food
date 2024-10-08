// app/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's sign-up mode
  const router = useRouter();

  // Handle login or sign-up
  const handleAuth = (e) => {
    e.preventDefault();

    // Retrieve stored credentials from localStorage
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (isSignUp) {
      // Sign-up logic
      if (email && password) {
        // Store credentials in localStorage
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        alert("Sign-up successful! You can now log in.");
        setIsSignUp(false); // Switch back to login mode
        setErrorMessage("");
      } else {
        setErrorMessage("Please provide both email and password.");
      }
    } else {
      // Login logic
      if (email === storedEmail && password === storedPassword) {
        alert("Login successful!");
        router.push("/home"); // Redirect to home page
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-4xl font-extrabold text-center text-gray-800">
          🍟 Food Store {isSignUp ? "Sign Up" : "Login"}
        </h2>

        {errorMessage && (
          <p className="mb-4 text-center text-red-600">{errorMessage}</p>
        )}

        <form onSubmit={handleAuth}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-lg font-semibold text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:ring focus:ring-pink-400"
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-pink-600 hover:underline"
          >
            {isSignUp ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
