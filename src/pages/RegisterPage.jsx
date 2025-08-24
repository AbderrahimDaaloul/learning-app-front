import React from "react";
import { Link } from "react-router-dom";

const TUNISIA_STATES = [
  "Ariana",
  "Béja",
  "Ben Arous",
  "Bizerte",
  "Gabès",
  "Gafsa",
  "Jendouba",
  "Kairouan",
  "Kasserine",
  "Kébili",
  "Kef",
  "Mahdia",
  "Manouba",
  "Médenine",
  "Monastir",
  "Nabeul",
  "Sfax",
  "Sidi Bouzid",
  "Siliana",
  "Sousse",
  "Tataouine",
  "Tozeur",
  "Tunis",
  "Zaghouan",
];

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="flex w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 min-h-[600px]">
        {/* Register Form */}
        <div className="flex-1 flex flex-col justify-center p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Create Your Account
          </h2>
          <form className="space-y-5">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-white mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-white/20"
                  placeholder="First Name"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-white/20"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-white/20"
                  placeholder="+216 12 345 678"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 border border-white/20"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-white mb-2"
              >
                State
              </label>
              <select
                id="state"
                name="state"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 border border-white/20"
              >
                <option value="" className="text-gray-800 bg-white">
                  Select your state
                </option>
                {TUNISIA_STATES.map((state) => (
                  <option
                    key={state}
                    value={state}
                    className="text-gray-800 bg-white"
                  >
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-white/20"
                placeholder="you@example.com"
              />
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-white/20"
                  placeholder="Password"
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-white/20"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg mt-2"
            >
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-purple-300 hover:text-purple-400 transition-colors"
            >
              {" "}
              Sign in
            </Link>
          </p>
        </div>
        {/* Illustration */}
        {/* <div className="hidden md:flex flex-1 items-center justify-center p-8">
          <img
            src={studyPerson}
            alt="Person studying"
            className="rounded-2xl shadow-2xl shadow-indigo-900/60 object-cover h-96 w-full max-w-xs border border-white/20"
          />
        </div> */}
      </div>
    </div>
  );
};

export default RegisterPage;
