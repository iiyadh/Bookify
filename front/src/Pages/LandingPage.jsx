import { useState, useEffect } from 'react';
import { 
  Calendar, 
  BarChart3, 
  Shield, 
  Zap, 
  TrendingUp, 
  Users,
  CheckCircle,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import Logo from '../assets/Logop1.svg';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <img src={Logo} alt="Bookify Logo" className="h-10 w-24" />
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-700 hover:text-slate-900 font-medium transition">Features</a>
              <a href="#how-it-works" className="text-slate-700 hover:text-slate-900 font-medium transition">How It Works</a>
              <a href="#pricing" className="text-slate-700 hover:text-slate-900 font-medium transition">Pricing</a>
              <Link to='/login' className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition">
                Get Started
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-slate-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-slate-700 hover:text-slate-900 font-medium transition">Features</a>
                <a href="#how-it-works" className="text-slate-700 hover:text-slate-900 font-medium transition">How It Works</a>
                <a href="#pricing" className="text-slate-700 hover:text-slate-900 font-medium transition">Pricing</a>
                <Link to='/login' className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition w-full">
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Smart Appointment Management
              <span className="block text-slate-600 text-3xl md:text-4xl mt-2 font-normal">For Modern Businesses</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
              Simplify appointment booking and service management for businesses and clients. 
              Designed for clinics, consultants, gyms, and service-based businesses.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to='/login' className="bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 transition flex items-center justify-center gap-2">
                Start Free Trial
                <ChevronRight size={20} />
              </Link>
              <Link to='/login' className="border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-xl font-medium hover:bg-slate-50 transition">
                Schedule a Demo
              </Link>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div className="mt-20 bg-linear-to-br from-slate-50 to-white rounded-2xl shadow-xl p-2 md:p-4 border border-slate-200">
            <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6" />
                <span className="font-medium">Bookify Dashboard</span>
              </div>
              <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              <div className="bg-white rounded-lg p-4 shadow border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-slate-900">Today's Appointments</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">+12</span>
                </div>
                <div className="text-3xl font-bold text-slate-900">24</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-slate-900">Revenue</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">+8%</span>
                </div>
                <div className="text-3xl font-bold text-slate-900">$2,840</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-slate-900">Client Satisfaction</h3>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">94%</span>
                </div>
                <div className="text-3xl font-bold text-slate-900">4.8</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Powerful Features for Your Business</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Everything you need to manage appointments efficiently and grow your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Appointment Management</h3>
              <p className="text-slate-600">
                Our platform simplifies appointment booking and service management for businesses and clients. 
                Users can easily browse services, schedule appointments, and manage their bookings in real time.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-Time Analytics & Insights</h3>
              <p className="text-slate-600">
                Track appointments by status, monitor daily booking trends, analyze service popularity, 
                and measure revenue growth. Make data-driven decisions to optimize your services.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Authentication</h3>
              <p className="text-slate-600">
                Secure authentication with role-based access control for administrators and users. 
                Maintain full data protection and privacy standards with robust security measures.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fast & Scalable Technology</h3>
              <p className="text-slate-600">
                Built with React, Node.js, Express, and MongoDB for high performance and scalability. 
                Supports real-time updates, API integration, and future expansion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Designed for Growth and Scalability
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Whether you are launching a small business or scaling an enterprise solution, 
                Bookify adapts to your needs. With customizable services, flexible scheduling, 
                and advanced analytics, businesses can grow efficiently while delivering a smooth 
                experience to their customers.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">For Clinics & Healthcare</h4>
                    <p className="text-slate-600">Manage patient appointments, medical staff schedules, and treatment rooms efficiently.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">For Consultants & Professionals</h4>
                    <p className="text-slate-600">Streamline client meetings, consultations, and project-based scheduling.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 mr-3 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">For Gyms & Fitness Centers</h4>
                    <p className="text-slate-600">Handle class bookings, personal training sessions, and facility reservations.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Why Choose Bookify?</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-blue-300 mr-4" />
                  <div>
                    <h4 className="font-bold text-lg">Increase Revenue</h4>
                    <p className="text-slate-300">Reduce no-shows and optimize scheduling to maximize profitability.</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-300 mr-4" />
                  <div>
                    <h4 className="font-bold text-lg">Improve Customer Satisfaction</h4>
                    <p className="text-slate-300">Provide seamless booking experiences that keep clients coming back.</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Zap className="h-8 w-8 text-yellow-300 mr-4" />
                  <div>
                    <h4 className="font-bold text-lg">Save Time & Resources</h4>
                    <p className="text-slate-300">Automate scheduling tasks and reduce administrative workload.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300">Join thousands of businesses using Bookify</p>
                    <p className="text-2xl font-bold">4.8/5 Rating</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-300">Trusted by</p>
                    <p className="text-2xl font-bold">2,500+ Companies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Appointment Management?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
            Start your free 14-day trial today. No credit card required. 
            Experience the power of Bookify for your business.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to='/login'  className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition">
              Get Started For Free
            </Link>
            <Link to='/login' className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition">
              Schedule a Personalized Demo
            </Link>
          </div>
          
          <p className="mt-8 text-slate-400">
            Join 2,500+ businesses already using Bookify
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-200">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
                <img src={Logo} alt="Bookify Logo" className="h-20 w-34" />
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-slate-600">© {new Date().getFullYear()} Bookify. All rights reserved.</p>
              <p className="text-slate-500 text-sm mt-2">Smart Appointment Management Platform</p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-200 text-center text-slate-500 text-sm">
            <p>Built with modern technologies: React, Node.js, Express, and MongoDB</p>
            <p className="mt-2">Designed for speed, security, and scalability</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;