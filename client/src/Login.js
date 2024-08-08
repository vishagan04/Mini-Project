import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImg from './assets/img1.jpg'; // Updated path
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [apiError, setApiError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.ok) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("userId", result.userId);
                console.log('Login successful', result);

                // Redirect to dashboard and force a refresh on the dashboard page
                navigate("/dashboard", { replace: true });

                // Optionally, you can force a reload of the dashboard page after navigating
                window.location.reload();
            } else {
                setApiError(result.message || 'Login failed');
            }
        } catch (err) {
            setApiError('Network error');
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col lg:flex-row max-w-4xl w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="flex-1 p-8">
                    <h2 className="text-2xl font-bold mb-2">Login</h2>
                    <span className="text-gray-500">Enter your credentials to access your account</span>

                    {apiError && <p className="text-red-500 text-sm mt-4">{apiError}</p>}

                    <form id="form" className="flex flex-col mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", { required: true })}
                                placeholder="Email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                            <input
                                type="password"
                                id="password"
                                {...register("password", { required: true })}
                                placeholder="Password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-800 text-white font-bold rounded-md shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="w-full py-2 px-4 bg-gray-200 text-gray-700 font-bold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Register
                        </button>
                    </form>
                </div>
                <div className="hidden lg:block lg:w-1/2">
                    <img src={bgImg} alt="Background" className="w-full h-full object-cover rounded-br-lg rounded-tr-lg" />
                </div>
            </div>
        </section>
    );
};

export default Login;



