import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowLeft, Shield, FileText, Users, AlertTriangle } from 'lucide-react';

const TermsofService = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const termsData = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <FileText className="w-5 h-5" />,
      content: `By accessing and using our appointment booking service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.`
    },
    {
      id: 'service',
      title: 'Service Description',
      icon: <Shield className="w-5 h-5" />,
      content: `Our platform provides an online appointment booking system that allows users to schedule appointments with service providers. We facilitate the connection between users and service providers but are not responsible for the actual services provided.`
    },
    {
      id: 'accounts',
      title: 'User Accounts',
      icon: <Users className="w-5 h-5" />,
      content: `You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate and complete information when creating your account and keep it updated. You are responsible for all activities that occur under your account.`
    },
    {
      id: 'privacy',
      title: 'Privacy and Data Protection',
      icon: <Shield className="w-5 h-5" />,
      content: `We collect and process your personal information in accordance with our Privacy Policy. By using our service, you consent to the collection and use of your information as described in our Privacy Policy.`
    },
    {
      id: 'appointments',
      title: 'Appointment Booking',
      icon: <FileText className="w-5 h-5" />,
      content: `When booking an appointment, you agree to: (1) Provide accurate information, (2) Arrive on time for your appointment, (3) Follow the cancellation policy, (4) Respect the service provider's policies and procedures.`
    },
    {
      id: 'cancellation',
      title: 'Cancellation Policy',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `Appointments may be cancelled or rescheduled according to the specific policies of each service provider. Please review the cancellation policy before booking. Late cancellations may result in charges as determined by the service provider.`
    },
    {
      id: 'prohibited',
      title: 'Prohibited Uses',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `You may not use our service for any unlawful purpose, to harass or harm others, to transmit spam or malicious content, to violate intellectual property rights, or to interfere with the proper functioning of the service.`
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: <Shield className="w-5 h-5" />,
      content: `Our platform serves as an intermediary between users and service providers. We are not liable for the quality of services provided, missed appointments, or any disputes between users and service providers. Use our service at your own risk.`
    },
    {
      id: 'modifications',
      title: 'Modifications to Terms',
      icon: <FileText className="w-5 h-5" />,
      content: `We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the service after changes are posted constitutes acceptance of the new terms.`
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: <Users className="w-5 h-5" />,
      content: `If you have any questions about these Terms of Service, please contact us through our support channels. We are committed to addressing your concerns promptly and professionally.`
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl mb-6 p-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Terms of Service
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Please read these terms carefully before using our appointment booking service. 
              These terms govern your use of our platform and services.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Last updated: January 15, 2026
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="space-y-4">
          {termsData.map((section) => (
            <div key={section.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-slate-600">{section.icon}</div>
                    <h2 className="text-xl font-semibold text-slate-800">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-slate-600">
                    {expandedSections[section.id] ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </button>
              
              {expandedSections[section.id] && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Agreement Section */}
        <div className="bg-white rounded-2xl shadow-2xl mt-8 p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
              <Shield className="w-8 h-8 text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Agreement Acknowledgment
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              By continuing to use our service, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms of Service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                I Accept Terms
              </button>
              <button
                onClick={() => navigate('/')}
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>
            These terms are effective as of the date of last update and remain in effect 
            until modified or terminated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsofService;