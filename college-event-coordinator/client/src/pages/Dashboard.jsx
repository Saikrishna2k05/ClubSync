import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  Settings,
  LogOut,
  Plus,
  Search,
  Bell,
  Menu,
  X,
  Home,
  BookOpen,
  Trophy,
  MapPin,
  Clock,
} from "lucide-react";
import { API_ENDPOINTS, apiCall } from "../config/api.js";
import { getAuthCookies, clearAuthCookies } from "../utils/cookies.js";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuthCookies();
    if (auth.user) {
      setUser(auth.user);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // ===========================================
      // API INTEGRATION POINT - Logout Endpoint
      // ===========================================
      // This calls: POST /auth/logout
      // Uncomment the following lines if your backend has a logout endpoint
      // await apiCall(API_ENDPOINTS.LOGOUT, {
      //   method: 'POST'
      // });
      // ===========================================
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with logout even if API call fails
    } finally {
      clearAuthCookies();
      navigate("/login");
    }
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home, current: true },
    { name: "Events", href: "/events", icon: Calendar, current: false },
    { name: "Clubs", href: "/clubs", icon: Users, current: false },
    { name: "Courses", href: "/courses", icon: BookOpen, current: false },
    {
      name: "Achievements",
      href: "/achievements",
      icon: Trophy,
      current: false,
    },
    { name: "Settings", href: "/settings", icon: Settings, current: false },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Meetup 2024",
      date: "2024-01-15",
      time: "14:00",
      location: "Main Auditorium",
      attendees: 45,
      type: "Workshop",
    },
    {
      id: 2,
      title: "Cultural Festival",
      date: "2024-01-20",
      time: "18:00",
      location: "Campus Grounds",
      attendees: 120,
      type: "Cultural",
    },
    {
      id: 3,
      title: "Career Fair",
      date: "2024-01-25",
      time: "10:00",
      location: "Conference Hall",
      attendees: 200,
      type: "Career",
    },
  ];

  const stats = [
    {
      name: "Total Events",
      value: "24",
      change: "+12%",
      changeType: "positive",
    },
    {
      name: "Active Clubs",
      value: "18",
      change: "+3%",
      changeType: "positive",
    },
    {
      name: "Total Members",
      value: "1,247",
      change: "+8%",
      changeType: "positive",
    },
    { name: "This Month", value: "8", change: "+2", changeType: "positive" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-gray-900">ClubSync</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? "bg-blue-100 text-blue-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-gray-900">ClubSync</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  item.current
                    ? "bg-blue-100 text-blue-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1">
              <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 pl-3" />
              <input
                type="text"
                placeholder="Search events, clubs, or members..."
                className="block h-full w-full border-0 py-0 pl-10 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm bg-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
            <div className="flex items-center gap-x-4">
              <div className="text-sm">
                <p className="font-medium text-gray-900">
                  {user?.username || user?.email || "User"}
                </p>
                <p className="text-gray-500">{user?.role || "Member"}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-x-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Welcome section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.username || user?.email || "User"}!
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Here's what's happening with your events and clubs today.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Calendar className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {stat.name}
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {stat.value}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <span
                        className={`font-medium ${
                          stat.changeType === "positive"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-gray-500"> from last month</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Quick Actions
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                      <Plus className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Create Event
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Organize a new event for your club or department
                    </p>
                  </div>
                </button>

                <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                      <Users className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Manage Club
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Update club information and member details
                    </p>
                  </div>
                </button>

                <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
                      <Calendar className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      <span className="absolute inset-0" aria-hidden="true" />
                      View Schedule
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Check upcoming events and deadlines
                    </p>
                  </div>
                </button>

                <button className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow hover:shadow-md transition-shadow">
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-700 ring-4 ring-white">
                      <Trophy className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      <span className="absolute inset-0" aria-hidden="true" />
                      View Reports
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Access analytics and performance reports
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Upcoming events */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Upcoming Events
                </h2>
                <a
                  href="/events"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  View all events →
                </a>
              </div>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {upcomingEvents.map((event) => (
                    <li key={event.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="flex items-center">
                                <p className="text-sm font-medium text-gray-900">
                                  {event.title}
                                </p>
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {event.type}
                                </span>
                              </div>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <Clock className="mr-1 h-4 w-4" />
                                {event.date} at {event.time}
                                <MapPin className="ml-3 mr-1 h-4 w-4" />
                                {event.location}
                                <Users className="ml-3 mr-1 h-4 w-4" />
                                {event.attendees} attendees
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="text-sm text-blue-600 hover:text-blue-500">
                              View Details
                            </button>
                            <button className="text-sm text-gray-400 hover:text-gray-500">
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
