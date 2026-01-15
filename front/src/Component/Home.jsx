const Home = () =>{
    return (
        <>
            <h1 className="text-2xl font-semibold">Welcome to your Dashboard</h1>
            <p className="mt-2 text-sm text-slate-600">
                This is your central hub for managing appointments, services, and users.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Intro cards */}
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                    <h2 className="text-base font-semibold text-slate-900">What is this project?</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        A real-world appointment booking platform for small businesses. Same system only the business type changes.
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        <li>Barber shop booking</li>
                        <li>Gym personal training booking</li>
                        <li>Doctor appointment booking</li>
                        <li>Salon booking</li>
                    </ul>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-5">
                    <h2 className="text-base font-semibold text-slate-900">For users</h2>
                    <ul className="mt-2 space-y-2 text-sm text-slate-700">
                        <li className="flex gap-2">
                            <span className="mt-0.5 h-2 w-2 flex-none rounded-full bg-slate-400" />
                            <span>Create an account</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="mt-0.5 h-2 w-2 flex-none rounded-full bg-slate-400" />
                            <span>Choose a service</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="mt-0.5 h-2 w-2 flex-none rounded-full bg-slate-400" />
                            <span>Select a date/time</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="mt-0.5 h-2 w-2 flex-none rounded-full bg-slate-400" />
                            <span>Book an appointment</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="mt-0.5 h-2 w-2 flex-none rounded-full bg-slate-400" />
                            <span>Receive confirmation</span>
                        </li>
                    </ul>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-5">
                    <h2 className="text-base font-semibold text-slate-900">For admins</h2>
                    <ul className="mt-2 space-y-2 text-sm text-slate-700">
                        <li className="flex gap-2">
                            <span className="mt-0.5 h-2 w-2 flex-none rounded-full bg-slate-400" />
                            <span>Manage bookings</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="mt-0.5 h-2 w-2 flex-none rounded-full bg-slate-400" />
                            <span>Approve / cancel appointments</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="mt-0.5 h-2 w-2 flex-none rounded-full bg-slate-400" />
                            <span>See calendar schedule</span>
                        </li>
                        <li className="flex gap-2">
                            <span className="mt-0.5 h-2 w-2 flex-none rounded-full bg-slate-400" />
                            <span>Manage users</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}


export default Home;