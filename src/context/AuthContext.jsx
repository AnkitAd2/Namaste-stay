import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedBookings = localStorage.getItem("bookings");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
    setLoading(false);
  }, []);

  // Google Login Handler
  const loginWithGoogle = (credentialResponse) => {
    try {
      // Decode the JWT token (in production, verify on backend)
      const userObj = {
        id: Math.random().toString(36).substr(2, 9),
        name: credentialResponse.name || "User",
        email: credentialResponse.email || "user@example.com",
        picture: credentialResponse.picture || "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
        loginTime: new Date().toISOString(),
      };
      
      setUser(userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Demo Login (for testing without Google)
  const loginWithDemo = (email = "user@namastestay.com", name = "Guest User") => {
    const userObj = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      picture: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg",
      loginTime: new Date().toISOString(),
    };
    
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
    return true;
  };

  // Logout Handler
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Add Booking
  const addBooking = (booking) => {
    const newBooking = {
      id: Math.random().toString(36).substr(2, 9),
      ...booking,
      bookedDate: new Date().toISOString(),
      status: "confirmed",
    };
    
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    
    return newBooking;
  };

  // Cancel Booking
  const cancelBooking = (bookingId) => {
    const updatedBookings = bookings.filter(b => b.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  const value = {
    user,
    loading,
    bookings,
    loginWithGoogle,
    loginWithDemo,
    logout,
    addBooking,
    cancelBooking,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
