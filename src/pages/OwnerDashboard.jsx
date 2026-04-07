import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, LayoutGrid, Home, Calendar, Settings, Plus, X, Clock, DollarSign, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [properties, setProperties] = useState([
    { id: 1, name: "Everest View Hotel", district: "Kathmandu", price: 2500, rating: 4.8, bookings: 12 },
    { id: 2, name: "Pokhara Heritage", district: "Pokhara", price: 3500, rating: 4.6, bookings: 8 },
    { id: 3, name: "Bhaktapur Palace", district: "Bhaktapur", price: 2000, rating: 4.7, bookings: 15 },
  ]);
  
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: "",
    price: "",
    district: "",
    province: "",
    uploadedImage: null,
  });

  const [recentActivity] = useState([
    { type: "booking", title: "New Booking: Patan House", time: "2 hours ago", details: "Ashton M. booked for 3 nights" },
    { type: "payment", title: "Payment Received", time: "11 hours ago", details: "NPR 65,000 for booking #8021" },
    { type: "review", title: "Review Posted", time: "Yesterday", details: '"Authentic and serene experience." ⭐⭐⭐⭐⭐' },
  ]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Please log in first</h1>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleAddProperty = (e) => {
    e.preventDefault();
    if (!newProperty.name || !newProperty.price || !newProperty.district || !newProperty.province) {
      alert("Please fill all required fields");
      return;
    }

    const property = {
      id: properties.length + 1,
      name: newProperty.name,
      district: newProperty.district,
      price: parseInt(newProperty.price),
      rating: 4.5,
      bookings: 0,
    };

    setProperties([...properties, property]);
    setNewProperty({ name: "", price: "", district: "", province: "", uploadedImage: null });
    setShowAddProperty(false);
    alert(`${newProperty.name} added successfully!`);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewProperty({ ...newProperty, uploadedImage: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Calculate stats
  const totalProperties = properties.length;
  const monthlyRevenue = properties.reduce((sum, p) => sum + p.price * (p.bookings || 0), 0);
  const activeBookings = properties.reduce((sum, p) => sum + (p.bookings || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-40 overflow-y-auto max-h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-black text-red-700">Namaste Stay</h2>
          <p className="text-xs text-gray-600 mt-1">💼 Property Manager</p>
        </div>

        {/* Menu */}
        <nav className="mt-6 space-y-2 px-4">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "dashboard"
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutGrid size={20} />
            DASHBOARD
          </button>
          <button
            onClick={() => setActiveTab("properties")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "properties"
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Home size={20} />
            MY PROPERTIES
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "bookings"
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Calendar size={20} />
            BOOKINGS
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "settings"
                ? "bg-red-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings size={20} />
            SETTINGS
          </button>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-0 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Manager Overview</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Welcome back. Here is what's happening with your heritage stays today.</p>
          </div>
          <div className="text-right whitespace-nowrap">
            <p className="text-sm text-gray-600">LOCAL TIME</p>
            <p className="text-xl sm:text-2xl font-bold text-red-600">
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Total Properties */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Home size={24} className="text-red-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">TOTAL PROPERTIES</p>
                </div>
                <p className="text-4xl font-bold text-gray-900">{totalProperties}</p>
                <p className="text-xs text-green-600 font-semibold">📈 {Math.floor(totalProperties * 0.2)} added this month</p>
              </div>

              {/* Monthly Revenue */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <DollarSign size={24} className="text-yellow-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">MONTHLY REVENUE</p>
                </div>
                <p className="text-4xl font-bold text-gray-900">NPR {monthlyRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 font-semibold">📈 +12.6% vs last month</p>
              </div>

              {/* Active Bookings */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Calendar size={24} className="text-green-600" />
                  </div>
                  <p className="text-sm font-semibold text-gray-600">ACTIVE BOOKINGS</p>
                </div>
                <p className="text-4xl font-bold text-gray-900">{activeBookings}</p>
                <p className="text-xs text-blue-600 font-semibold">📅 6 check-ins today</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add New Property */}
              <div className="col-span-2">
                <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Add New Heritage Property</h2>
                    <p className="text-red-600 font-semibold text-sm mt-1">Step 1: Basic Details</p>
                  </div>

                  {!showAddProperty ? (
                    <button
                      onClick={() => setShowAddProperty(true)}
                      className="w-full px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <Plus size={20} />
                      Add New Property
                    </button>
                  ) : (
                    <form onSubmit={handleAddProperty} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {/* Hotel Name */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">HOTEL NAME</label>
                          <input
                            type="text"
                            value={newProperty.name}
                            onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                            placeholder="e.g. Kathmandu Durbar House"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>

                        {/* Price */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">PRICE PER NIGHT (NPR)</label>
                          <input
                            type="number"
                            value={newProperty.price}
                            onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
                            placeholder="0.00"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {/* District */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">DISTRICT</label>
                          <select
                            value={newProperty.district}
                            onChange={(e) => setNewProperty({ ...newProperty, district: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            <option value="">Select District</option>
                            <option value="Kathmandu">Kathmandu</option>
                            <option value="Pokhara">Pokhara</option>
                            <option value="Bhaktapur">Bhaktapur</option>
                            <option value="Panauti">Panauti</option>
                            <option value="Janakpur">Janakpur</option>
                          </select>
                        </div>

                        {/* Province */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">PROVINCE</label>
                          <select
                            value={newProperty.province}
                            onChange={(e) => setNewProperty({ ...newProperty, province: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            <option value="">Select Province</option>
                            <option value="Bagmati">Bagmati</option>
                            <option value="Gandaki">Gandaki</option>
                            <option value="Janakpur">Janakpur</option>
                          </select>
                        </div>
                      </div>

                      {/* Image Upload */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">GALLERY & COVER PHOTO</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-500 transition-colors">
                          <div className="text-4xl mb-3">📸</div>
                          <p className="text-gray-600 font-semibold mb-2">Drag and drop high-resolution images of your property</p>
                          <p className="text-xs text-gray-500 mb-4">PNG, JPG, GIF up to 10MB each</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="imageInput"
                          />
                          <label
                            htmlFor="imageInput"
                            className="cursor-pointer text-red-600 font-semibold hover:underline"
                          >
                            Browse Files
                          </label>
                        </div>

                        {newProperty.uploadedImage && (
                          <div className="mt-4 grid grid-cols-3 gap-4">
                            <div className="relative">
                              <img
                                src={newProperty.uploadedImage}
                                alt="Uploaded"
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex items-center justify-center">
                              <Plus size={32} className="text-gray-300" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-all"
                        >
                          Publish Property
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddProperty(false);
                            setNewProperty({ name: "", price: "", district: "", province: "", uploadedImage: null });
                          }}
                          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3 pb-4 border-b last:border-b-0">
                      <div>
                        {activity.type === "booking" && <CheckCircle size={20} className="text-green-600 mt-1" />}
                        {activity.type === "payment" && <DollarSign size={20} className="text-yellow-600 mt-1" />}
                        {activity.type === "review" && <div className="text-xl mt-1">⭐</div>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm">{activity.title}</p>
                        <p className="text-xs text-gray-600">{activity.details}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full text-red-600 font-bold text-sm hover:underline mt-4">
                  VIEW ALL ACTIVITY
                </button>
              </div>
            </div>

            {/* Manager Insight */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Manager Insight</h3>
              <p className="text-gray-700 mb-4">
                Properties in <span className="font-bold">Bhaktapur</span> are seeing a 25% surge in demand for the upcoming festival season. Consider adjusting your festive rates.
              </p>
              <button className="text-yellow-700 font-bold text-sm hover:underline">
                Explore Market Trends →
              </button>
            </div>
          </div>
        )}

        {/* PROPERTIES TAB */}
        {activeTab === "properties" && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Properties ({properties.length})</h2>
              <button
                onClick={() => setShowAddProperty(true)}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold flex items-center gap-2"
              >
                <Plus size={20} />
                Add Property
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {properties.map((property) => (
                <div key={property.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{property.name}</h3>
                      <p className="text-sm text-gray-600">{property.district}</p>
                    </div>
                    <div className="text-xl">⭐ {property.rating}</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Price:</span> NPR {property.price.toLocaleString()}/night</p>
                    <p><span className="font-semibold">Bookings:</span> {property.bookings}</p>
                    <p><span className="font-semibold">Status:</span> <span className="text-green-600 font-semibold">Active</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Bookings</h2>
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">Booking management coming soon</p>
              <p className="text-gray-500 text-sm mt-2">View and manage all guest bookings here</p>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
            <div className="space-y-6 max-w-2xl">
              <div className="pb-6 border-b">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Profile Information</h3>
                <p className="text-gray-600 mb-4">Name: <span className="font-semibold">{user.name}</span></p>
                <p className="text-gray-600">Email: <span className="font-semibold">{user.email}</span></p>
              </div>

              <div className="pb-6 border-b">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Preferences</h3>
                <label className="flex items-center gap-3 mb-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-gray-700">Email notifications for new bookings</span>
                </label>
                <label className="flex items-center gap-3 mb-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-gray-700">Weekly revenue reports</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-gray-700">Monthly market insights</span>
                </label>
              </div>

              <div>
                <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
