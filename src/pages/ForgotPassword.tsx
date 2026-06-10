import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { Input } from '../components/Shared/Input';
import { Button } from '../components/Shared/Button';
import { Label } from '../components/Shared/Label';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async() => {
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    const { data:data, error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: 'http://localhost:5173/resetPassword'
      }
    )
    console.log(data, error)

  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Check Your Email</h1>
          <p className="text-gray-600 mb-6">
            We've sent password reset instructions to <span className="font-semibold text-gray-900">{email}</span>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setEmail('');
            }}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to forgot password
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded mt-2 md:mt-4 lg:mt-6 shadow p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-100 rounded-full p-3">
              <Mail className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="title-h1 text-gray-900 mb-2">Forgot Password?</h1>
          <p className="text-gray-600">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Reset Password'}
          </Button>

          <Button
            onClick={() => window.history.back()}
            className="w-full bg-transparent text-black hover:text-blue-400 font-medium text-sm flex items-center justify-center gap-2 py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Button>
        </div>
      </div>
    </div>
  );
}