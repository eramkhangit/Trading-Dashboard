import { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import { Button } from '../components/Shared/Button';
import { Label } from '../components/Shared/Label';
import { Input } from '../components/Shared/Input';
import { supabase } from '../lib/supabaseClient';
import { useLocation } from 'wouter';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [feedbackmsg, setFeedbackmsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [, setLocation] = useLocation()

  //   const validatePassword = (pwd: string) => {
  //     if (pwd.length < 8) {
  //       return 'Password must be at least 8 characters long';
  //     }
  //     if (!/(?=.*[a-z])/.test(pwd)) {
  //       return 'Password must contain at least one lowercase letter';
  //     }
  //     if (!/(?=.*[A-Z])/.test(pwd)) {
  //       return 'Password must contain at least one uppercase letter';
  //     }
  //     if (!/(?=.*\d)/.test(pwd)) {
  //       return 'Password must contain at least one number';
  //     }
  //     return '';
  //   };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!password) {
      newErrors.password = "Password is required!"
    }

    if (confirmPassword.length < 8) {
      newErrors.confirmPassword = 'Password must be at least 8 characters'
    } else if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required!'
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })
      if (error) {
        setFeedbackmsg({ type: "error", text: error?.message })
      }
      else {
        setFeedbackmsg({ type: 'success', text: 'Password updated successfully!' })
        setTimeout(() => {
          setLocation('/login')
        }, 2000);
      }
    } catch (error) {
      setFeedbackmsg({ type: 'error', text: `An unexpected error occurred ${error}` })
    }
    setIsLoading(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Password Reset Successful!</h2>
          <p className="text-gray-600 mb-8">Your password has been updated successfully. You can now log in with your new password.</p>
          <Button
            onClick={() => window.location.href = '/login'}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded shadow p-8 mt-2 md:mt-4 lg:mt-6 max-w-md w-full">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="title-h1 text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600">Enter your new password below</p>
        </div>
        {
          feedbackmsg?.text && <p>{feedbackmsg?.type}:{feedbackmsg?.text}</p>
        }
        <div className="space-y-6">
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                placeholder="Enter new password"
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-50"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </Button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                placeholder="Confirm new password"
              />
              <Button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 bg-white hover:bg-gray-50"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Password requirements:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center">
                <span className={`mr-2 ${password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>•</span>
                At least 8 characters
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${/(?=.*[a-z])/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>•</span>
                One lowercase letter
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${/(?=.*[A-Z])/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>•</span>
                One uppercase letter
              </li>
              <li className="flex items-center">
                <span className={`mr-2 ${/(?=.*\d)/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>•</span>
                One number
              </li>
            </ul>
          </div> */}

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </Button>
        </div>

        <div className="mt-6 text-center">
          <a href="/login" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}