import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import { Truck, ArrowRight } from 'lucide-react';

const Shipping = () => {
    const { saveShippingAddress, shippingAddress } = useCartStore();
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        saveShippingAddress({ address, city, postalCode, country });
        navigate('/place-order');
    };

    return (
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Steps Indicator (Simplified) */}
            <div className="flex items-center justify-center mb-10 text-sm font-medium text-gray-500 dark:text-gray-400">
                <span className="text-primary font-bold flex items-center gap-1"><Truck className="w-4 h-4" /> Shipping</span>
                <span className="mx-4 text-gray-300 dark:text-gray-600">/</span>
                <span>Review & Place Order</span>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 sm:p-10 transition-colors duration-300">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Shipping Address</h1>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Address</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="Street address, P.O. Box..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">City</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Postal Code</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                placeholder="Zip Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Country</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition-all shadow-lg shadow-primary/20 transform hover:-translate-y-1 flex items-center justify-center gap-2 mt-4"
                    >
                        Continue to Order Review
                        <ArrowRight className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Shipping;
