import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';
import useThemeStore from '../store/useThemeStore';
import { ShoppingCart, User, LogOut, Search, Menu, X, ChevronDown, Mic, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const { cartItems } = useCartStore();
    const { theme, toggleTheme } = useThemeStore();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    // Apply theme to HTML element
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Mock search function (in a real app, this would be an API call)
    // We can fetch all products once or filter from a passed prop, 
    // but for now let's just use a hardcoded list or fetch efficiently.
    // Ideally, we should fetch products via context or a hook.
    // For this demo, let's assume we can fetch or we'll just redirect.
    // BETTER APPROACH: Let's fetch products for search in a useEffect if not too heavy,
    // or just rely on the API. Let's use the API.

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm.length > 1) {
                try {
                    // Simple search implementation: fetching all and filtering 
                    // (Optimization: Backend should have a search endpoint)
                    const { data } = await import('axios').then(m => m.default.get('/api/products'));
                    const filtered = data.filter(p =>
                        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.category.toLowerCase().includes(searchTerm.toLowerCase())
                    ).slice(0, 5); // Limit to 5 results
                    setSearchResults(filtered);
                    setShowResults(true);
                } catch (error) {
                    console.error("Search error", error);
                }
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const [isListening, setIsListening] = useState(false);

    // Voice Search Handler
    const handleVoiceSearch = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setSearchTerm(transcript);
                // Trigger search logic immediately
                if (transcript.length > 1) {
                    setShowResults(true);
                }
            };

            recognition.start();
        } else {
            alert("Voice search is not supported in this browser.");
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?keyword=${searchTerm}`);
            setShowResults(false);
        }
    };

    return (
        <nav className="bg-white/90 dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">F</span>
                        </div>
                        <h1 className="text-2xl font-bold text-dark dark:text-white tracking-tight transition-colors">Fresh<span className="text-primary">Kart</span></h1>
                    </Link>

                    {/* Desktop Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
                        <form onSubmit={handleSearch} className="relative w-full">
                            <input
                                type="text"
                                placeholder={isListening ? "Listening..." : "Search for vegetables, fruits..."}
                                className={`w-full pl-10 pr-12 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-gray-700 transition-all border-none ${isListening ? 'ring-2 ring-red-400 bg-red-50 dark:bg-red-900/20 placeholder-red-400' : ''}`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onBlur={() => setTimeout(() => setShowResults(false), 200)} // Delay hide to allow clicks
                                onFocus={() => searchTerm.length > 1 && setShowResults(true)}
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

                            {/* Voice Search Button */}
                            <button
                                type="button"
                                onClick={handleVoiceSearch}
                                className={`absolute right-3 top-2 p-1 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-primary hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                title="Voice Search"
                            >
                                <Mic className="h-4 w-4" />
                            </button>
                        </form>

                        {/* Smart Search Results Dropdown */}
                        {showResults && searchResults.length > 0 && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                                {searchResults.map(product => (
                                    <Link
                                        key={product._id}
                                        to={`/product/${product._id}`}
                                        className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-50 dark:border-gray-700 last:border-0"
                                        onClick={() => setShowResults(false)}
                                    >
                                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{product.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                                        </div>
                                        <div className="ml-auto">
                                            <p className="text-sm font-bold text-primary">₹{product.items[0].price}</p>
                                        </div>
                                    </Link>
                                ))}
                                <Link
                                    to={`/?keyword=${searchTerm}`}
                                    className="block p-3 text-center text-sm font-bold text-primary hover:bg-gray-50 dark:hover:bg-gray-700 bg-gray-50/50 dark:bg-gray-800/50"
                                >
                                    View all results for "{searchTerm}"
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors">Home</Link>
                        {/* Categories Dropdown could go here */}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        <Link to="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800">
                            <ShoppingCart className="h-6 w-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium focus:outline-none">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                {/* Dropdown */}
                                <div className="absolute right-0 w-56 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
                                    <div className="py-2">
                                        {user.isAdmin && (
                                            <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary">
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary">
                                            My Profile
                                        </Link>
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary">
                                            My Orders
                                        </Link>
                                        <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                                        <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2">
                                            <LogOut className="h-4 w-4" /> Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="px-4 py-2 text-primary font-semibold hover:bg-primary/5 dark:hover:bg-primary/10 rounded-lg transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="px-5 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-secondary shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-1 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                        </button>
                        <Link to="/cart" className="relative text-gray-600 dark:text-gray-300">
                            <ShoppingCart className="h-6 w-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        <form onSubmit={(e) => { handleSearch(e); setIsOpen(false); }} className="mb-4 mt-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </form>
                        <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800">Home</Link>
                        {user ? (
                            <>
                                {user.isAdmin && <Link to="/admin/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800">Admin Dashboard</Link>}
                                <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800">My Orders</Link>
                                <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800">Login</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-gray-50 dark:hover:bg-gray-800">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
