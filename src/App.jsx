import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Districts from "./pages/Districts";
import Listings from "./pages/Listings";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthProvider from "./context/AuthContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/districts" element={<Districts />} />
          <Route path="/stays" element={<Listings />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookings" element={<Dashboard />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}