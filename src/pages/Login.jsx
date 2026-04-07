import { useNavigate } from "react-router-dom";
import { Mail, Loader, ArrowRight, User, Lock } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithDemo } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState(null); // null, "user", or "owner"
  const [isRegister, setIsRegister] = useState(false); // toggle between login and register
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Handle Demo Login
  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const success = loginWithDemo("demo@namastestay.com", "Demo User");
      if (success) {
        setTimeout(() => {
          if (userType === "owner") {
            navigate("/owner-dashboard");
          } else {
            navigate("/");
          }
        }, 500);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      // Simulate registration - in real app, send to backend
      const registeredUser = {
        name,
        email,
        password, // Note: In production, NEVER store plain passwords!
        picture: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
      };

      // Store in localStorage (demo only)
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      if (existingUsers.some(u => u.email === email)) {
        alert("Account with this email already exists");
        setLoading(false);
        return;
      }

      existingUsers.push(registeredUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      setRegisterSuccess(true);
      setName("");
      setPassword("");
      setConfirmPassword("");
      
      setTimeout(() => {
        setIsRegister(false);
        setRegisterSuccess(false);
      }, 3000);
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
          if (userType === "owner") {
            navigate("/owner-dashboard");
          } else {
            navigate("/");
          }
        }, 500);
      }
    } finally {
      setLoading(false);
    }
  };

  // Choice screen - select between User and Owner login
  if (userType === null) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">Namaste Stay</h1>
              <p className="text-sm text-gray-600">Nepal's Premier Booking Platform</p>
              <p className="text-xs text-red-600 font-semibold">Select Your Account Type</p>
            </div>

            {/* User Type Selection */}
            <div className="space-y-4">
              {/* User Login Button */}
              <button
                onClick={() => setUserType("user")}
                className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all text-left group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600">
                      Guest Login
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Book stays and manage reservations
                    </p>
                  </div>
                  <ArrowRight className="text-red-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Owner Login Button */}
              <button
                onClick={() => setUserType("owner")}
                className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                      Owner/Property Manager
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Manage hotels and view bookings
                    </p>
                  </div>
                  <ArrowRight className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500">
              <p>Choose your account type to continue</p>
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

  // User Login
  if (userType === "user") {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {isRegister ? "Create Account" : "Guest Login"}
              </h1>
              <p className="text-gray-600 text-sm">
                {isRegister ? "Join Namaste Stay to book stays" : "Sign in to book and manage stays"}
              </p>
            </div>

            {/* Logo */}
            <div className="flex justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-black text-red-700">Namaste Stay</h2>
                <p className="text-xs text-red-600 font-semibold">Nepal</p>
              </div>
            </div>

            {/* Success Message */}
            {registerSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-700 font-semibold">✓ Account created successfully!</p>
                <p className="text-green-600 text-sm">You can now log in with your credentials</p>
              </div>
            )}

            {!isRegister ? (
              <>
                {/* LOGIN FORM */}
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
                  className="w-full px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

                {/* Switch to Register */}
                <div className="text-center text-sm">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={() => setIsRegister(true)}
                      className="text-red-600 font-semibold hover:text-red-700 underline"
                    >
                      Create one
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* REGISTER FORM */}
                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Confirm Password Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Register Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </button>
                </form>

                {/* Switch to Login */}
                <div className="text-center text-sm">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <button
                      onClick={() => {
                        setIsRegister(false);
                        setName("");
                        setPassword("");
                        setConfirmPassword("");
                      }}
                      className="text-red-600 font-semibold hover:text-red-700 underline"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </>
            )}

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 space-y-2">
              <p>
                {isRegister
                  ? "Your account will be created securely"
                  : "Don't have an account? Create one during registration"}
              </p>
              <p>This is a demo app. Your data is stored locally in your browser.</p>
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

            {/* Back Button */}
            <button
              onClick={() => {
                setUserType(null);
                setIsRegister(false);
                setName("");
                setPassword("");
                setConfirmPassword("");
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50"
            >
              ← Back to Account Selection
            </button>
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

  // Owner Login
  if (userType === "owner") {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">Property Owner Login</h1>
              <p className="text-gray-600 text-sm">Manage your hotels and bookings</p>
            </div>

            {/* Logo */}
            <div className="flex justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-black text-blue-700">Namaste Stay</h2>
                <p className="text-xs text-blue-600 font-semibold">Partners</p>
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

            {/* Google Login Button for Owner */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  placeholder="owner@hotel.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Demo Owner Login Button */}
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  <span>Demo Login</span>
                </>
              ) : (
                <span>Demo Owner Login</span>
              )}
            </button>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-800">
              <p className="font-semibold mb-2">Property Owner Benefits:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>List and manage multiple properties</li>
                <li>Track guest bookings and payments</li>
                <li>Respond to guest reviews</li>
                <li>Access performance analytics</li>
              </ul>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setUserType(null)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50"
            >
              ← Back to Account Selection
            </button>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }
}

