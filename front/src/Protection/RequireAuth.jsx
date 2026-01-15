import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

const RequireAuth = ({ children }) => {
  const { isAuthenticated, checkAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const runCheck = async () => {
      try {
        const res = await checkAuth();
        setResult(res);
      } finally {
        setLoading(false);
      }
    };

    runCheck();
  }, [checkAuth]);

  if (loading)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600"></div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  )

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (result && result.status && result.status === 'inactive') {
    return <Navigate to="/inactive-user" replace />;
  }

  return children;
};

export default RequireAuth;
