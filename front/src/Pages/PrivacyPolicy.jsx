import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Privacy Policy
                    </h1>
                    
                    <div className="prose prose-lg max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Information We Collect
                            </h2>
                            <p className="text-gray-600 mb-4">
                                We collect information you provide directly to us, such as when you create an account, 
                                make a purchase, or contact us for support.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                How We Use Your Information
                            </h2>
                            <p className="text-gray-600 mb-4">
                                We use the information we collect to provide, maintain, and improve our services, 
                                process transactions, and communicate with you.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Information Sharing
                            </h2>
                            <p className="text-gray-600 mb-4">
                                We do not sell, trade, or otherwise transfer your personal information to third parties 
                                without your consent, except as described in this policy.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Data Security
                            </h2>
                            <p className="text-gray-600 mb-4">
                                We implement appropriate security measures to protect your personal information 
                                against unauthorized access, alteration, disclosure, or destruction.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Contact Us
                            </h2>
                            <p className="text-gray-600 mb-4">
                                If you have any questions about this Privacy Policy, please contact us at 
                                <span className="text-blue-600 font-medium"> tabaiiyadh317@gmail.com</span>.
                            </p>
                        </section>

                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                            >
                                Back to Login
                            </button>
                        </div>

                        <div className="border-t pt-6 mt-8">
                            <p className="text-sm text-gray-500">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;