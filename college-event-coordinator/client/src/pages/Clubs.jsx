import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, MapPin, Mail, Plus, Search, Globe, Instagram, Linkedin, Facebook } from "lucide-react";
import { API_ENDPOINTS, apiCall } from "../config/api.js";
import { getAuthCookies } from "../utils/cookies.js";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuthCookies();
    if (auth.user) {
      setUser(auth.user);
    }
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const data = await apiCall(API_ENDPOINTS.CLUBS);
      setClubs(data.clubs || []);
    } catch (err) {
      console.error("Error fetching clubs:", err);
      setError("Failed to load clubs");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClub = async (clubId) => {
    try {
      await apiCall(API_ENDPOINTS.JOIN_CLUB(clubId), {
        method: "POST",
      });
      // Refresh clubs to update membership status
      fetchClubs();
    } catch (err) {
      console.error("Error joining club:", err);
      setError(err.message || "Failed to join club");
    }
  };

  const handleLeaveClub = async (clubId) => {
    try {
      await apiCall(API_ENDPOINTS.LEAVE_CLUB(clubId), {
        method: "POST",
      });
      // Refresh clubs to update membership status
      fetchClubs();
    } catch (err) {
      console.error("Error leaving club:", err);
      setError(err.message || "Failed to leave club");
    }
  };

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "academic", label: "Academic" },
    { value: "cultural", label: "Cultural" },
    { value: "sports", label: "Sports" },
    { value: "technical", label: "Technical" },
    { value: "social", label: "Social" },
    { value: "other", label: "Other" },
  ];

  const isMember = (club) => {
    return club.members?.some(member => member.user === user?._id);
  };

  const isAdmin = (club) => {
    return club.admin === user?._id;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading clubs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Clubs</h1>
              <p className="mt-2 text-gray-600">
                Discover and join clubs that match your interests
              </p>
            </div>
            {user?.role === "clubAdmin" && (
              <button
                onClick={() => navigate("/clubs/create")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Create Club</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search clubs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        {/* Clubs Grid */}
        {filteredClubs.length === 0 ? (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No clubs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating the first club."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <div
                key={club._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {club.imageUrl && (
                  <img
                    src={club.imageUrl}
                    alt={club.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {club.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {club.status}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {club.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {club.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {club.members?.length || 0} members
                    </div>
                    {club.contactEmail && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-4 w-4 mr-2" />
                        {club.contactEmail}
                      </div>
                    )}
                  </div>

                  {/* Social Links */}
                  {club.socialLinks && (
                    <div className="flex items-center space-x-2 mb-4">
                      {club.socialLinks.instagram && (
                        <a
                          href={club.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:text-pink-700"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                      )}
                      {club.socialLinks.linkedin && (
                        <a
                          href={club.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {club.socialLinks.facebook && (
                        <a
                          href={club.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Facebook className="h-4 w-4" />
                        </a>
                      )}
                      {club.socialLinks.website && (
                        <a
                          href={club.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-700"
                        >
                          <Globe className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    {isAdmin(club) ? (
                      <span className="text-sm text-gray-500">Admin</span>
                    ) : isMember(club) ? (
                      <button
                        onClick={() => handleLeaveClub(club._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Leave Club
                      </button>
                    ) : (
                      <button
                        onClick={() => handleJoinClub(club._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Join Club
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/clubs/${club._id}`)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Clubs;
