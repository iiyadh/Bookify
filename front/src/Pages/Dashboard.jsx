import Navbar from "../Component/Navbar.jsx";
import { Outlet } from "react-router-dom";


export default function Dashboard() {

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Navbar */}
            <Navbar />
            {/* Content */}
            <main className="mx-auto max-w-6xl px-4 py-10">
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10">
                   <Outlet />
                </div>
            </main>
        </div>
    );
}