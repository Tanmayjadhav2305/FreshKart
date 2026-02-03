import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import useCartStore from '../store/useCartStore';
import toast from 'react-hot-toast';
import { Star, Truck, ShieldCheck, Clock, Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [selectedUnit, setSelectedUnit] = useState('');

    const { addToCart } = useCartStore();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
                if (data.items && data.items.length > 0) {
                    setSelectedUnit(data.items[0].unit);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, Number(qty), selectedUnit);
        toast.success(
            <div className="flex items-center gap-2">
                <span className="font-bold">Added to cart!</span>
                <span className="text-sm">View in cart or continue shopping.</span>
            </div>
        );
    };

    if (loading) return (
        <div className="flex justify-center items-center h-[60vh]">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!product) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Product Not Found</h2>
            <Link to="/" className="text-primary hover:underline mt-4 inline-block">Return to Home</Link>
        </div>
    );

    const currentItem = product.items.find(i => i.unit === selectedUnit) || {};

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 transition-colors font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shopping
            </Link>

            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row transition-colors duration-300">

                {/* Left: Image Section */}
                <div className="md:w-1/2 bg-gray-50 dark:bg-gray-800 relative group transition-colors duration-300">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[400px] md:h-[600px] object-contain p-8 transition-transform duration-500 group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700">
                        Organic
                    </div>
                </div>

                {/* Right: Info Section */}
                <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                            {product.category}
                        </span>
                        <div className="flex items-center text-yellow-400">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-gray-500 dark:text-gray-400 text-sm ml-1 font-medium">4.8 (120 reviews)</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">{product.name}</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">{product.description}</p>

                    {/* Unit Selection */}
                    <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Available Packs</label>
                        <div className="flex flex-wrap gap-3">
                            {product.items.map((item) => (
                                <button
                                    key={item.unit}
                                    onClick={() => setSelectedUnit(item.unit)}
                                    className={`px-6 py-3 border-2 rounded-xl text-sm font-bold transition-all ${selectedUnit === item.unit
                                        ? 'border-primary bg-primary/5 dark:bg-primary/10 text-primary shadow-sm'
                                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {item.unit}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-gray-100 dark:border-gray-800 mb-8">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Total Price</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">₹{currentItem.price * qty}</span>
                                <span className="text-lg text-gray-400 dark:text-gray-500 font-medium line-through">₹{Math.round(currentItem.price * qty * 1.2)}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800">
                                <button
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                    className="px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-10 text-center font-bold text-gray-900 dark:text-white">{qty}</span>
                                <button
                                    onClick={() => setQty(qty + 1)}
                                    className="px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition-all shadow-xl shadow-primary/20 transform hover:-translate-y-1 flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={product.isOutOfStock}
                    >
                        <ShoppingCart className="h-6 w-6" />
                        {product.isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-2">
                                <Truck className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Fast Delivery</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Quality Assured</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 mb-2">
                                <Clock className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Fresh Daily</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
