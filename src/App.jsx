import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Districts from "./pages/Districts";
import Listings from "./pages/Listings";
import HotelDetails from "./pages/HotelDetails";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import AuthProvider from "./context/AuthContext";

function AppContent() {
  const location = useLocation();
  const hideNavFooter = location.pathname === "/owner-dashboard";

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/districts" element={<Districts />} />
        <Route path="/stays" element={<Listings />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/hotel/:hotelId" element={<HotelDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bookings" element={<Dashboard />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}