import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CheckCircle, Truck, MapPin } from 'lucide-react';

const PlaceOrder = () => {
    const { cartItems, shippingAddress, clearCart } = useCartStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const tax = subtotal * 0.05;
    const shippingPrice = 0; // Free shipping
    const totalPrice = subtotal + tax + shippingPrice;

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const placeOrderHandler = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const orderData = {
                orderItems: cartItems.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    image: item.image,
                    price: item.price,
                    product: item.product,
                    unit: item.unit
                })),
                shippingAddress,
                paymentMethod: 'Cash On Delivery', // Simplified for now
                itemsPrice: subtotal,
                taxPrice: tax,
                shippingPrice,
                totalPrice,
            };

            const { data } = await axios.post('/api/orders', orderData, config);

            toast.success('Order Placed Successfully!');
            clearCart();
            // navigate(`/order/${data._id}`); // Ideally go to order details
            navigate('/profile'); // For now go to profile/orders
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error placing order');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Steps Indicator (Simplified) */}
            <div className="flex items-center justify-center mb-10 text-sm font-medium text-gray-500 dark:text-gray-400">
                <span className="text-primary font-bold flex items-center gap-1"><Truck className="w-4 h-4" /> Shipping</span>
                <span className="mx-4 text-primary font-bold">——</span>
                <span className="text-primary font-bold flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Review & Place Order</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Review Your Order</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Order Details */}
                <div className="lg:w-2/3 space-y-8">

                    {/* Shipping Info Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 transition-colors duration-300">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" /> Shipping To</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
                        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Items in Order</h2>
                        </div>
                        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                            {cartItems.map((item, index) => (
                                <li key={index} className="p-6 flex items-center gap-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
                                    <div className="flex-1">
                                        <Link to={`/product/${item.product}`} className="font-bold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary">
                                            {item.name}
                                        </Link>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.qty} x {item.unit} @ ₹{item.price}</p>
                                    </div>
                                    <p className="font-bold text-gray-900 dark:text-white">₹{(item.qty * item.price).toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 sticky top-24 transition-colors duration-300">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Items</span>
                                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Shipping</span>
                                <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Tax (5%)</span>
                                <span className="font-medium">₹{tax.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">Total</span>
                                <span className="text-3xl font-bold text-primary">₹{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={placeOrderHandler}
                            className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1 text-lg"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
