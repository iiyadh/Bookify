import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const InactiveUser = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleGoToLogin = async () => {
        await logout();
        toast.success('Logout successful!');
        navigate('/login');
    };
    
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg border border-gray-300 p-6 max-w-sm w-full">
                {/* Simple Alert */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 rounded-full">
                        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                    </div>
                    
                    <div>
                        <h3 className="font-medium text-gray-900">Account Inactive</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            This account is currently suspended.
                        </p>
                    </div>
                    
                    <button
                        onClick={handleGoToLogin}
                        className="w-full py-2.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors"
                    >
                        <ArrowLeft className="inline-block mr-2 h-4 w-4" />
                        Return to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InactiveUser;