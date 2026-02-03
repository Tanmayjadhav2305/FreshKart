import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { ArrowLeft, Package, MapPin, CreditCard, Calendar, Truck, CheckCircle } from 'lucide-react';

const OrderDetails = () => {
    const { id } = useParams();
    const { user } = useAuthStore();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get(`/api/orders/${id}`, config);
                setOrder(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        if (user) {
            fetchOrder();
        }
    }, [id, user]);

    if (loading) return (
        <div className="flex justify-center items-center h-[60vh]">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!order) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800">Order Not Found</h2>
            <Link to="/profile" className="text-primary hover:underline mt-4 inline-block">Back to Orders</Link>
        </div>
    );

    // Calculate progress based on status
    const steps = ['Placed', 'Packed', 'Out for delivery', 'Delivered'];
    const currentStepIndex = steps.indexOf(order.status);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <Link to="/profile" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-4 transition-colors font-medium">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        Order #{order._id.substring(20, 24).toUpperCase()}
                        <span className={`text-base px-3 py-1 rounded-full border ${order.isDelivered ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'}`}>
                            {order.status}
                        </span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-10 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                <div className="relative flex justify-between">
                    {/* Line background */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 -translate-y-1/2 z-0"></div>
                    {/* Active Line */}
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
                        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {steps.map((step, index) => {
                        const isCompleted = index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;

                        return (
                            <div key={step} className="relative z-10 flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted ? 'bg-primary border-primary text-white' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-300 dark:text-gray-600'}`}>
                                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : <div className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />}
                                </div>
                                <span className={`absolute top-10 text-xs font-bold whitespace-nowrap ${isCurrent ? 'text-primary' : isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>
                                    {step}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left: Items */}
                <div className="md:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><Package className="h-5 w-5 text-gray-500 dark:text-gray-400" /> Items</h2>
                        </div>
                        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                            {order.orderItems.map((item, index) => (
                                <li key={index} className="p-6 flex items-center gap-6">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <Link to={`/product/${item.product}`} className="font-bold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors">
                                            {item.name}
                                        </Link>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.qty} x {item.unit}</p>
                                    </div>
                                    <p className="font-bold text-gray-900 dark:text-white">₹{(item.qty * item.price).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col sm:flex-row justify-between gap-6 transition-colors duration-300">
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" /> Shipping Address</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{order.shippingAddress.address}</p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{order.shippingAddress.city} {order.shippingAddress.postalCode}</p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{order.shippingAddress.country}</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><CreditCard className="h-5 w-5 text-gray-400 dark:text-gray-500" /> Payment Method</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{order.paymentMethod}</p>
                            <p className={`text-xs font-bold mt-1 ${order.isPaid ? 'text-green-600 dark:text-green-400' : 'text-orange-500 dark:text-orange-400'}`}>
                                {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}` : 'Payment Pending (COD)'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Summary */}
                <div className="md:col-span-1">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 sticky top-24 transition-colors duration-300">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Items</span>
                                <span className="font-medium">₹{(order.itemsPrice || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Shipping</span>
                                <span className="text-green-600 dark:text-green-400 font-medium font-bold">
                                    {(order.shippingPrice || 0) === 0 ? 'Free' : `₹${order.shippingPrice}`}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Tax</span>
                                <span className="font-medium">₹{(order.taxPrice || 0).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">Total</span>
                                <span className="text-2xl font-bold text-primary">₹{(order.totalPrice || 0).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center transition-colors duration-300">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Need help with this order?</p>
                            <Link to="/contact" className="text-primary font-bold text-sm hover:underline">Contact Support</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
