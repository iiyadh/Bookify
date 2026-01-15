import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.jsx";

const RequireRole = ({ children , allowedRoles }) => {

  const { role } = useContext(AuthContext);

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/user" replace />;
    }

  return children;
};

export default RequireRole;
