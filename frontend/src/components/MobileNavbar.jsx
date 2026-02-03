import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingCart, User, Heart } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const MobileNavbar = () => {
    const { pathname } = useLocation();
    const { cartItems } = useCartStore();

    const navItems = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Categories', icon: Grid, path: '/?category=All' }, // Using existing query param logic
        { name: 'Cart', icon: ShoppingCart, path: '/cart', badge: cartItems.length },
        { name: 'Profile', icon: User, path: '/profile' }
    ];

    return (
        <div className="md:hidden fixed bottom-4 left-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 shadow-2xl rounded-2xl z-50 pb-safe">
            <div className="flex justify-between items-center px-6 py-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex flex-col items-center justify-center space-y-1 relative group transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                                }`}
                        >
                            <div className={`relative p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10 shadow-inner' : ''}`}>
                                <item.icon
                                    className={`h-5 w-5 transition-all duration-300 ${isActive ? 'fill-primary text-primary' : 'stroke-current'}`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                                {item.badge > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold h-3.5 w-3.5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white dark:ring-gray-900">
                                        {item.badge}
                                    </span>
                                )}
                            </div>

                            {/* Active Indicator Dot */}
                            {isActive && (
                                <span className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full"></span>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileNavbar;
