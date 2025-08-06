import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { getAuthCookies, clearAuthCookies } from "../utils/cookies.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const auth = getAuthCookies();
    if (auth.user) {
      setUser(auth.user);
    }
  }, []);

  const handleLogout = () => {
    clearAuthCookies();
    window.location.href = "/login";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ClubSync</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 ml-10">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Home
              </Link>
              <a
                href="#features"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.username || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive("/")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <a
                href="#features"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>

              {/* Mobile Auth */}
              {user ? (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-3 py-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">
                        {user.username || user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
