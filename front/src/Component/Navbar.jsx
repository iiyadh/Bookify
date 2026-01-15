import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogOut } from 'lucide-react';
import Logop1 from '../../public/Logop1.svg';


const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        toast.success('Logout successful!');
        navigate('/login');
    };
    return (
            <header className="sticky top-0 z-10 border-b border-slate-200/70 bg-white/75 backdrop-blur">
                <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="grid h-10 w-25 place-items-center rounded-lg bg-white text-xs font-semibold text-white">
                            <img src={Logop1} alt="Logo" className="h-10 w-24" />
                        </div>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-4">
                        <div className="flex flex-wrap items-center gap-1 rounded-xl">
                            <Link
                                to="/dashboard/inbox"
                                className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                            >
                                Inbox
                            </Link>
                            <Link
                                to="/dashboard/services"
                                className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                            >
                                Services
                            </Link>
                            <Link
                                to="/dashboard/calendar"
                                className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                            >
                                Calander
                            </Link>
                            <Link
                                to="/dashboard/users"
                                className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                            >
                                Users
                            </Link>
                             <Link
                                to="/dashboard/statics"
                                className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                            >
                                Statics
                            </Link>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:translate-y-px"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </button>
                </nav>
            </header>
    )
}


export default Navbar;