import React from "react";
import studyPerson from "../assets/studyPerson.jpg";

const LoginPage = () => {
return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="flex w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 min-h-[540px]">
            {/* Login Form */}
            <div className="flex-1 flex flex-col justify-center p-8 sm:p-12">
                <h2 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Welcome Back
                </h2>
                <form className="space-y-6">
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
                            autoComplete="email"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-white/20"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
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
                            autoComplete="current-password"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-white/20"
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 block text-sm text-white"
                            >
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-blue-300 hover:text-blue-400 transition-colors"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-300">
                    Don't have an account?{" "}
                    <a
                        href="#"
                        className="font-medium text-purple-300 hover:text-purple-400 transition-colors"
                    >
                        Sign up
                    </a>
                </p>
            </div>
            {/* Illustration */}
            <div className="hidden md:flex flex-1 items-center justify-center p-8">
                <img
                    // src={studyPerson}
                    src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80"
                    alt="Person studying"
                    className="rounded-2xl shadow-2xl shadow-indigo-900/60 object-cover h-96 w-full max-w-xs border border-white/20"
                />
            </div>
        </div>
    </div>
);
};

export default LoginPage;
