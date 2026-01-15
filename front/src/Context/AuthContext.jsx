import { createContext , useState } from "react";
import api from "../api/instance";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);


    const register = async (userData) => {
        try{
            const res = await api.post('/auth/register', userData);
            setIsAuthenticated(true);
            setRole(res.data.role);
        }catch(err){
            throw err;
        }
    };

    const login = async (userData) => {
        try{
            const res = await api.post('/auth/login', userData);
            setIsAuthenticated(true);
            setRole(res.data.role);
        }catch(err){
            throw err;
        }
    };

    const loginWithGoogle = async (token) => {
        try{
            const res = await api.post(`/auth/google/${token}`);
            setIsAuthenticated(true);
            setRole(res.data.role);
        }catch(err){
            throw err;
        }
    };

    const loginWithFacebook = async (token) => {
        try{
            const res = await api.post(`/auth/facebook/${token}`);
            setIsAuthenticated(true);
            setRole(res.data.role);
        }catch(err){
            throw err;
        }
    };
    
    const logout = async () => {
        try{
            await api.post('/auth/logout');
            setIsAuthenticated(false);
            setRole(null);
        }catch(err){
            throw err;
        }
    };


    const checkAuth = async () => {
        try{
            const res = await api.get('/auth/checkAuth');
            setIsAuthenticated(res.data.isAuthenticated);
            setRole(res.data.role);
            return res.data;
        }catch(err){
            setIsAuthenticated(false);
            setRole(null);
        }
    };

    const value = {
        register,
        login,
        logout,
        checkAuth,
        loginWithGoogle,
        loginWithFacebook,
        role,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthProvider;