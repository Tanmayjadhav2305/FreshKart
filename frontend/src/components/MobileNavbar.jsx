import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingCart, User } from 'lucide-react';
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
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-[0_-5px_10px_rgba(0,0,0,0.05)] z-50 pb-safe">
            <div className="flex justify-around items-center px-2 py-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex flex-col items-center justify-center w-full space-y-1 relative group ${isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                                }`}
                        >
                            <div className={`p-1 rounded-xl transition-all duration-300 ${isActive ? 'bg-primary/10' : ''}`}>
                                <item.icon
                                    className={`h-6 w-6 transition-all duration-300 ${isActive ? 'fill-current' : 'stroke-current'}`}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </div>
                            <span className="text-[10px] font-medium tracking-wide">{item.name}</span>

                            {item.badge > 0 && (
                                <span className="absolute top-0 right-1/4 -mt-1 -mr-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-bounce-short">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileNavbar;
