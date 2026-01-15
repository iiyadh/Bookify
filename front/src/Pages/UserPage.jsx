import { LogOut, User , History ,Plus} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.jsx";
import { Outlet, useNavigate ,Link  } from "react-router-dom";
import { toast } from "react-hot-toast";
import Logop1 from '../assets/Logop1.svg';

const UserPage = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        toast.success('Logout successful!');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-slate-100 pt-24">
            <div className="fixed top-0 left-0 right-0 z-50">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-b-2xl shadow-xl border border-gray-100 border-t-0 overflow-hidden">
                        <div className="bg-linear-to-r from-slate-800 to-slate-900 px-8 py-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                                        <User className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
                                        <p className="text-blue-100 mt-1">Manage your appointment with 
                                            <img src={Logop1} alt="Logo" className="inline h-10 w-16 ml-2 mr-2 bg-linear-to-br from-gray-50 to-slate-100 rounded-3xl pl-1 pr-1 "/>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-6">
                                    <Link
                                        to="/user/makeappoitement"
                                        className="text-blue-200 hover:text-blue-100 text-sm font-medium transition-all duration-200"
                                    >
                                        <p className="flex justify-center items-center gap-1"><Plus/> Make Appointment</p>
                                    </Link>
                                    <Link
                                        to="/user/history"
                                        className="text-white hover:text-blue-100 text-sm font-medium transition-all duration-200"
                                    >
                                        <p className="flex justify-center items-center gap-1"><History /> Appointment History</p>
                                    </Link>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-6">
                <Outlet />
            </div>
        </div>
    );
};

export default UserPage;