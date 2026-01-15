import { useNavigate ,useParams } from "react-router-dom";
import { useState  } from 'react';
import toast from 'react-hot-toast';
import { ArrowBigLeft } from 'lucide-react';
import api from '../api/instance';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();

    const [formData, setFormData] = useState({
        password: '',
        Cpassword: ''
    });

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        else if (formData.password !== formData.Cpassword) {
            newErrors.password = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const validationErrors = validateForm();
            if (Object.keys(validationErrors).length === 0) {
                // Simulate password reset
                await api.post(`/password/reset/${token}`, { password: formData.password });
                toast.success('Password has been reset successfully!');
                setFormData({ password: '' });
                navigate('/login');
            }
            else {
                setErrors(validationErrors);
            }
        }catch(err){
            console.error('Error during password reset:', err);
            toast.error('Failed to reset password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">
                <ArrowBigLeft className="inline-block w-6 h-6 mr-2 cursor-pointer" onClick={() => navigate('/login')} />
                Reset Password
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-600 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all duration-200 ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 focus:border-slate-600'
                  }`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500">{errors.password}</p>
                )}
              </div>


            <div>
              <label htmlFor="Cpassword" className="block text-sm font-medium text-slate-600 mb-2">
                Confirme Password
              </label>
              <input
                type="password"
                id="Cpassword"
                name="Cpassword"
                value={formData.Cpassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all duration-200 ${errors.password
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-200 focus:border-slate-600'
                  }`}
                placeholder="Enter your password again"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
    
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-slate-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      );
}


export default ResetPassword;