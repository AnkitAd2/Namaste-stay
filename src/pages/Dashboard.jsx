import { useNavigate } from "react-router-dom";
import { LogOut, Calendar, MapPin, Users, DollarSign, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, bookings, cancelBooking } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <img
                src={user.picture}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-red-100"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Member since {new Date(user.loginTime).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Bookings Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="space-y-4">
                <Calendar size={48} className="mx-auto text-gray-300" />
                <h3 className="text-2xl font-bold text-gray-700">No bookings yet</h3>
                <p className="text-gray-600">
                  Start exploring and book your perfect stay in Nepal!
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold inline-block"
                >
                  Explore Stays
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Image */}
                  {booking.image && (
                    <div className="h-48 overflow-hidden bg-gray-200">
                      <img
                        src={booking.image}
                        alt={booking.hotelName}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{booking.hotelName}</h3>
                      <div className="flex items-center gap-1 text-yellow-500 mt-1">
                        {"★".repeat(Math.floor(booking.rating || 4))}
                        <span className="text-gray-600 ml-2">({booking.rating || 4})</span>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-red-600" />
                        <span>{booking.district}, {booking.province}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-red-600" />
                        <span>{booking.checkIn} to {booking.checkOut}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-red-600" />
                        <span>{booking.guests} guests</span>
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <DollarSign size={16} className="text-green-600" />
                        <span className="font-bold text-gray-900">
                          NPR {booking.totalPrice || booking.price}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {booking.status || "confirmed"}
                      </span>
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                        title="Cancel booking"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {bookings.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <p className="text-gray-600 text-sm font-semibold mb-2">Total Bookings</p>
              <p className="text-4xl font-bold text-red-600">{bookings.length}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <p className="text-gray-600 text-sm font-semibold mb-2">Total Spent</p>
              <p className="text-4xl font-bold text-green-600">
                NPR {bookings.reduce((sum, b) => sum + parseInt(b.totalPrice || b.price || 0), 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <p className="text-gray-600 text-sm font-semibold mb-2">Districts Visited</p>
              <p className="text-4xl font-bold text-blue-600">
                {new Set(bookings.map(b => b.district)).size}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
