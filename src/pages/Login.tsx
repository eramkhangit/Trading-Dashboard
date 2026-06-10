import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation } from "wouter";
import { Label } from "../components/Shared/Label";
import { Input } from "../components/Shared/Input";
import { Button } from "../components/Shared/Button";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn } = useAuth();
  const [errorMsg, setErrorMsg] = useState("")

  const [, setLocation] = useLocation();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await signIn(formData.email, formData.password);
        console.log("Login successful:", { ...formData, rememberMe });
        setLocation("/dashboard");
      } catch (error) {
        console.error("Login failed :", error);
        setErrorMsg("Login failed. Please check your credentials.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded shadow p-8 max-w-md w-full mt-2 md:mt-4 lg:mt-6">
        <div className="text-center mb-8">
          <h1 className="title-h1 text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Log in to your account to continue</p>
        </div>

        {errorMsg && (
          <p className="text-sm text-red-600 text-center">{errorMsg}</p>
        )}

        <div className="space-y-5">
          <div>
            <Label 
              htmlFor="email">
              Email Address
            </Label>

            <div className="relative">

              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange} 
                className={`pl-10 py-3 border${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="john@example.com"
                />

            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}

          </div>

          <div>
            <Label
              htmlFor="password"
              // className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </Label>

            <div className="relative">
              <Lock  className="absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="••••••••"
                helperText="Password should be atleast 8 character"
              />

              <Button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-400 bg-white hover:bg-gray-50"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            < Label
               className="flex items-center cursor-pointer">
              <Input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </Label>
            <Link
              href="/forgotPassword"
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            onClick={handleSubmit}
            leftIcon={<LogIn className="h-4 w-4" />}
            className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            Log In
          </Button>         
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
