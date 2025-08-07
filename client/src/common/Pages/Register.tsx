import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Request from "../api/axios";
import axios from "axios";

const Register = () => {
    // State for form fields
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [countryCode, setCountryCode] = useState<string>("+1");

    // Define error state type
    interface FormErrors {
        userName?: string;
        email?: string;
        password?: string;
        phoneNumber?: string;
        countryCode?: string;
    }

    const [errors, setErrors] = useState<FormErrors>({});

    // Validation function
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Username validation
        if (!userName.trim()) {
            newErrors.userName = "Username is required";
        } else if (userName.length < 3) {
            newErrors.userName = "Username must be at least 3 characters";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email format";
        }

        // Password validation
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = "Password must contain an uppercase letter";
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = "Password must contain a number";
        }

        // Phone validation
        const cleanedPhone = phoneNumber.replace(/\D/g, "");
        if (!cleanedPhone) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (cleanedPhone.length < 7 || cleanedPhone.length > 15) {
            newErrors.phoneNumber = "Invalid phone number (7-15 digits)";
        }

        // Country code validation
        if (!countryCode) {
            newErrors.countryCode = "Country code is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            // Form is valid - proceed with registration
            console.log("Registration data:", {
                userName,
                email,
                password,
                phoneNumber: countryCode + phoneNumber.replace(/\D/g, ""),
            });
            const res = await Request(
                "/auth/register",
                "POST",
                true,
                undefined,
                undefined,
                {
                    userName,
                    email,
                    password,
                    phoneNumber: countryCode + phoneNumber.replace(/\D/g, ""),
                }
            );
            // const res = await axios({
            //     url: `${import.meta.env.VITE_BACKEND_URL}/register`,
            //     method: "POST",
            //     withCredentials: true,
            //     data: {
            //         userName,
            //         email,
            //         password,
            //         phoneNumber: countryCode + phoneNumber.replace(/\D/g, ""),
            //     },
            // });
            // const res = await fetch(
            //     `${import.meta.env.VITE_BACKEND_URL}/register`,
            //     {
            //         method: "POST",
            //         body: JSON.stringify({
            //             userName,
            //             email,
            //             password,
            //             phoneNumber:
            //                 countryCode + phoneNumber.replace(/\D/g, ""),
            //         }),
            //         credentials: "include",
            //     }
            // );
            console.log(res);
        }
    };

    // Handler for phone number input
    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Allow only numbers and common phone symbols
        const value = e.target.value.replace(/[^0-9()+\-\s]/g, "");
        setPhoneNumber(value);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create an account
                    </h2>
                </div>
                <form
                    className="mt-8 space-y-6  shadow-[0_0px_10px_rgba(0,0,0,0.25)] p-3 rounded-md"
                    onSubmit={handleSubmit}
                >
                    <div className="rounded-md -space-y-px">
                        {/* Username */}
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={userName}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setUserName(e.target.value)
                                }
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.userName
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="Enter username"
                            />
                            {errors.userName && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.userName}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value)
                                }
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="Enter email"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setPassword(e.target.value)
                                }
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="Create password"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <div className="flex space-x-2">
                                <div className="w-1/4">
                                    <select
                                        value={countryCode}
                                        onChange={(
                                            e: ChangeEvent<HTMLSelectElement>
                                        ) => setCountryCode(e.target.value)}
                                        className={`block w-full px-3 py-2 border ${
                                            errors.countryCode
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                    >
                                        <option value="+1">+20 (EG)</option>
                                        <option value="+1">+1 (US)</option>
                                        <option value="+44">+44 (UK)</option>
                                        <option value="+33">+33 (FR)</option>
                                        <option value="+49">+49 (DE)</option>
                                        <option value="+81">+81 (JP)</option>
                                        <option value="+91">+91 (IN)</option>
                                    </select>
                                </div>
                                <div className="w-3/4">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={handlePhoneChange}
                                        className={`block w-full px-3 py-2 border ${
                                            errors.phoneNumber
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                        placeholder="Phone number"
                                    />
                                </div>
                            </div>
                            {(errors.phoneNumber || errors.countryCode) && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.phoneNumber || errors.countryCode}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="primary w-full">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
