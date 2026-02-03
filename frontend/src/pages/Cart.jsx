import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import { Trash2, ArrowRight, ShoppingBag, Minus, Plus } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart } = useCartStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;

    const checkoutHandler = () => {
        if (!user) {
            navigate('/login?redirect=shipping');
        } else {
            navigate('/shipping');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Go ahead and explore our fresh products.</p>
                <Link to="/" className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-secondary transition-all shadow-lg hover:-translate-y-1">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items List */}
                <div className="lg:w-2/3">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
                        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                            {cartItems.map((item) => (
                                <li key={`${item.product}-${item.unit}`} className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 text-center md:text-left">
                                        <Link to={`/product/${item.product}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors">
                                            {item.name}
                                        </Link>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1 uppercase tracking-wide">{item.unit}</p>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                                            <button
                                                onClick={() => addToCart({ ...item, _id: item.product, items: [{ unit: item.unit, price: item.price }] }, Number(item.qty) - 1, item.unit)}
                                                className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary disabled:opacity-30 transition-colors"
                                                disabled={item.qty <= 1}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="w-10 text-center font-bold text-gray-900 dark:text-white">{item.qty}</span>
                                            <button
                                                onClick={() => addToCart({ ...item, _id: item.product, items: [{ unit: item.unit, price: item.price }] }, Number(item.qty) + 1, item.unit)}
                                                className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <p className="text-xl font-bold text-gray-900 dark:text-white min-w-[80px] text-right">₹{(item.price * item.qty).toFixed(2)}</p>

                                        <button
                                            onClick={() => removeFromCart(item.product)}
                                            className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                            title="Remove Item"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 p-8 sticky top-24 transition-colors duration-300">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Subtotal</span>
                                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Tax (5%)</span>
                                <span className="font-medium">₹{tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                <span>Shipping</span>
                                <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">Total</span>
                                <span className="text-2xl font-bold text-primary">₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={checkoutHandler}
                            className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
                        >
                            Proceed to Checkout
                            <ArrowRight className="h-5 w-5" />
                        </button>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                Secure Checkout - 100% Satisfaction Guaranteed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
