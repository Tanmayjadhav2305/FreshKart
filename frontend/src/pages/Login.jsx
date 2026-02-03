import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, error, loading, user } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
        if (error) {
            toast.error(error);
        }
    }, [user, error, navigate, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter your details to access your account</p>
                </div>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                            </div>
                            <input
                                type="email"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <Link to="/forgot-password" className="text-sm text-primary font-medium hover:underline">Forgot password?</Link>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                            </div>
                            <input
                                type="password"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-secondary transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>Sign In <ArrowRight className="h-5 w-5" /></>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-primary font-bold hover:underline">
                        Create account
                    </Link>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden md:block w-1/2 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
                <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000"
                    alt="Grocery Shopping"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12">
                    <blockquote className="text-white">
                        <p className="text-2xl font-serif italic mb-4">"The best way to predict the future is to create it. Changing the way we shop for food."</p>
                        <footer className="font-bold">— The FreshKart Team</footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default Login;
