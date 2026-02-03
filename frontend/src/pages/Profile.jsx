import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { User, Package, Calendar, MapPin, ChevronRight, LogOut } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuthStore();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            console.log('Fetching orders for user:', user?.name);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('/api/orders/myorders', config);
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
            case 'Out for delivery': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Packed': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Account</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Profile Card */}
                <div className="lg:w-1/3">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
                        <div className="bg-gradient-to-br from-primary to-secondary h-32 relative">
                            {/* Decorative bubbles */}
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <User className="h-32 w-32 text-white" />
                            </div>
                        </div>
                        <div className="px-8 pb-8">
                            <div className="relative -mt-16 mb-6">
                                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-md bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden transition-colors duration-300">
                                    <span className="text-4xl font-bold text-primary">{user.name.charAt(0)}</span>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">{user.email}</p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl transition-colors duration-300">
                                    <Package className="h-5 w-5 text-primary" />
                                    <span className="font-medium">{orders.length} Orders Placed</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl transition-colors duration-300">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    <span className="font-medium">Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                                </div>
                            </div>

                            <button
                                onClick={logout}
                                className="w-full mt-8 border-2 border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 font-bold py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center justify-center gap-2"
                            >
                                <LogOut className="h-4 w-4" /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                {/* Orders History */}
                <div className="lg:w-2/3">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Package className="h-5 w-5" /> Recent Orders
                    </h2>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No orders yet</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">Start shopping to see your orders here.</p>
                            <Link to="/" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-secondary transition-colors shadow-lg hover:-translate-y-1">
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order._id} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all group">
                                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Order #{order._id.substring(20, 24).toUpperCase()}</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 w-fit ${getStatusColor(order.status)}`}>
                                            <div className={`w-2 h-2 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                            {order.status}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 overflow-x-auto pb-2">
                                        {/* Show first 3 images */}
                                        {order.orderItems.slice(0, 3).map((item, idx) => (
                                            <div key={idx} className="relative w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                                                <span className="absolute -bottom-2 -right-2 bg-gray-900 dark:bg-gray-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">x{item.qty}</span>
                                            </div>
                                        ))}
                                        {order.orderItems.length > 3 && (
                                            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0 text-gray-400 dark:text-gray-500 text-xs font-bold">
                                                +{order.orderItems.length - 3}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50 dark:border-gray-800">
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Total Amount</p>
                                            <p className="text-lg font-bold text-gray-900 dark:text-white">₹{order.totalPrice.toFixed(2)}</p>
                                        </div>
                                        <Link to={`/order/${order._id}`} className="text-primary font-semibold text-sm hover:underline flex items-center">
                                            View Details <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
