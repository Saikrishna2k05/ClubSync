import { Link } from "react-router-dom";
import {
  Calendar,
  Users,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Calendar,
      title: "Event Management",
      description:
        "Create, organize, and manage college events with ease. Track attendance, schedules, and resources.",
    },
    {
      icon: Users,
      title: "Club Coordination",
      description:
        "Manage student clubs, coordinate activities, and foster community engagement across campus.",
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description:
        "Get detailed reports and analytics on event performance, attendance trends, and engagement metrics.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with role-based access control and data protection for your institution.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student Council President",
      content:
        "ClubSync has revolutionized how we organize events. The platform is intuitive and has made our job so much easier.",
      rating: 5,
    },
    {
      name: "Dr. Michael Chen",
      role: "Faculty Advisor",
      content:
        "The analytics and reporting features help us track student engagement and improve our programs effectively.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Event Coordinator",
      content:
        "Managing multiple clubs and events has never been this streamlined. Highly recommend for any college!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6">
              <span className="text-white text-3xl font-bold">C</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Streamline Your
              <span className="text-blue-600"> College Events</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The all-in-one platform for managing college events, clubs, and
              student activities. Simplify coordination, boost engagement, and
              create memorable campus experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center shadow-md hover:shadow-lg">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage College Events
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From small club meetings to large campus events, ClubSync provides
              all the tools you need to organize, promote, and track your
              activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Colleges Using ClubSync</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                10,000+
              </div>
              <div className="text-gray-600">Events Organized</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                50,000+
              </div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Students and Faculty
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about ClubSync
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Campus Events?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join hundreds of colleges already using ClubSync to streamline their
            event management and boost student engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors shadow-lg hover:shadow-xl"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ClubSync</h3>
              <p className="text-gray-400">
                The complete platform for college event management and student
                engagement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ClubSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
