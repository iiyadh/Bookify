import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowBigLeft } from 'lucide-react';
import api from '../api/instance';


const ForgetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
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
        if (!formData.email) {
            newErrors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        return newErrors;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const validationErrors = validateForm();
            if (Object.keys(validationErrors).length === 0) {
                await api.post('/password/forgot', { email: formData.email });
                toast.success('Password reset link has been sent to your email!');
                setFormData({ email: '' });
                navigate('/login');
            } else {
                setErrors(validationErrors);
            }
        }catch(err){
            console.error('Error during password reset:', err);
            toast.error('Failed to send reset link. Please try again.');
        }
    };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">
            <ArrowBigLeft className="inline-block w-6 h-6 mr-2 cursor-pointer" onClick={() => navigate('/login')} />
          Forget Password
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all duration-200 ${
                errors.email 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-200 focus:border-slate-600'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-slate-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;