import { useNavigate } from "react-router-dom";
import { Mail, Loader } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithDemo } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Demo Login
  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const success = loginWithDemo("demo@namastestay.com", "Demo User");
      if (success) {
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Login (Demo - shows how to integrate)
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // This simulates Google login response
      // In production, use @react-oauth/google library:
      // 1. Install: npm install @react-oauth/google
      // 2. Wrap App with GoogleOAuthProvider
      // 3. Use GoogleLogin component
      
      const mockGoogleUser = {
        name: "Google User",
        email: email || "user@gmail.com",
        picture: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
      };
      
      const success = loginWithGoogle(mockGoogleUser);
      if (success) {
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 text-sm">Sign in to your Namaste Stay account</p>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-black text-red-700">Namaste Stay</h2>
              <p className="text-xs text-red-600 font-semibold">Nepal</p>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Sign in with</span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Email Input for Demo */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email (optional for demo)
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Demo Login Button */}
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                <span>Demo Login</span>
              </>
            ) : (
              <span>Demo Login (No Google API Key Needed)</span>
            )}
          </button>

          {/* Footer */}
          <div className="text-center text-sm text-gray-600 space-y-2">
            <p>Don't have an account? We'll create one on your first login.</p>
            <p className="text-xs text-gray-500">
              This is a demo app. Your data is stored locally in your browser.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-800">
            <p className="font-semibold mb-2">To enable Google Login:</p>
            <ol className="list-decimal list-inside space-y-1 text-blue-700">
              <li>Install: <code className="bg-white px-1 rounded">npm install @react-oauth/google</code></li>
              <li>Get Google OAuth Client ID from <span className="font-semibold">Google Cloud Console</span></li>
              <li>Add GoogleOAuthProvider wrapper in App.jsx</li>
              <li>Replace mock login with real GoogleLogin component</li>
            </ol>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a href="/" className="text-red-600 hover:text-red-700 font-semibold text-sm">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
