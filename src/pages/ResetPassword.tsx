import { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

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
    const newErrors: { password?: string; confirmPassword?: string } = {};
    
    // const passwordError = validatePassword(password);
    // if (passwordError) {
    //   newErrors.password = passwordError;
    // }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Password Reset Successful!</h2>
          <p className="text-gray-600 mb-8">Your password has been updated successfully. You can now log in with your new password.</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Lock className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600">Enter your new password below</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all`}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
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

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
          </button>
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