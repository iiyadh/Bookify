import { useNavigate } from 'react-router-dom';


const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
                <div className="mb-6">
                    <h1 className="text-9xl font-bold text-gray-300">404</h1>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600">
                        The page you are looking for doesn't exist or has been moved.
                    </p>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-600 transition"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFound;