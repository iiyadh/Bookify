import { useState , useContext } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from "react-facebook-login";
import toast from 'react-hot-toast';


const Login = () => {
    const navigate = useNavigate();
    const { login , loginWithGoogle ,loginWithFacebook } = useContext(AuthContext);

    const onSwitchToRegister = () => {
        navigate('/register');
    }
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remmberMe: false
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
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const validationErrors = validateForm();

      if (Object.keys(validationErrors).length === 0) {
        await login({
          email: formData.email,
          password: formData.password
        });
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        setErrors(validationErrors);
      }
    }catch(err){
      toast.error('Login failed. Please check your credentials.');
    }
  };
  const handleSignInWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await loginWithGoogle(tokenResponse.access_token);
        toast.success('Google sign-in successful!');
        navigate('/dashboard');
      }catch (err) {
        console.log(err);
        toast.error('Google sign-in failed.');
      }
    },
    onError: () => {
      toast.error('Google sign-in was unsuccessful. Please try again.');
    },
  });

  const handleSignInWithFacebook = async (res) => {
    try{
      await loginWithFacebook(res.accessToken);
      toast.success('Facebook sign-in successful!');
      navigate('/dashboard');
    }catch(err){
      console.log(err);
      toast.error('Facebook sign-in failed.');
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">
          Welcome Back
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

          {/* Password Field */}
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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-slate-600 focus:ring-slate-600 border-gray-300 rounded"
                onChange={()=>setFormData({...formData, remmberMe: !formData.remmberMe})}/>
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-slate-600 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-slate-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="grow border-t border-gray-200"></div>
            <span className="shrink mx-4 text-gray-400 text-sm">OR</span>
            <div className="grow border-t border-gray-200"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 border-2 border-gray-200 rounded-lg py-3 hover:bg-gray-50 hover:scale-110 transition-all"
              onClick={handleSignInWithGoogle}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>
            
            <button
              type="button"
              className="flex items-center justify-center gap-2 border-2 border-gray-200 rounded-lg py-3 hover:bg-gray-50 hover:scale-110 transition-all relative"
              onClick={() => {
                // Find and click the Facebook button
                const fbBtn = document.querySelector('.facebook-login-btn button') ||
                  document.querySelector('.fb-login-button button');
                if (fbBtn) fbBtn.click();
              }}
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
              </svg>
              <span className="text-sm font-medium">Facebook</span>
            </button>

            {/* Facebook Login - Hidden but accessible */}
            <div className="facebook-login-btn absolute opacity-0 pointer-events-none">
              <FacebookLogin
                appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                autoLoad={false}
                fields="name,email"
                callback={handleSignInWithFacebook}
              />
            </div>
          </div>

          {/* Switch to Register */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-slate-600 font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;