import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import Hero from '../components/Hero';
import CategorySlider from '../components/CategorySlider';
import { Filter, Search, ShoppingCart, Star } from 'lucide-react';
import ProductSkeleton from '../components/ProductSkeleton';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCartStore();
    const { addToWishlist, isInWishlist } = useWishlistStore();
    const [searchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category');
    const searchFilter = searchParams.get('keyword');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');

                // Safety check: ensure data is an array before using it
                if (Array.isArray(data)) {
                    let filtered = data;

                    if (categoryFilter) {
                        filtered = filtered.filter(p => p.category === categoryFilter);
                    }

                    if (searchFilter) {
                        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchFilter.toLowerCase()));
                    }

                    setProducts(filtered);
                } else {
                    console.error('Expected array from API but got:', typeof data);
                    setProducts([]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]); // Ensure valid state on error
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryFilter, searchFilter]);

    // GSAP Animation for products
    const containerRef = useRef(null);
    useGSAP(() => {
        if (products.length > 0) {
            gsap.to(".product-card", {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    }, { scope: containerRef, dependencies: [products] });

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-12">
                {[...Array(10)].map((_, index) => (
                    <ProductSkeleton key={index} />
                ))}
            </div>
        );
    } return (
        <div className="pb-20">
            {!categoryFilter && !searchFilter && <Hero />}
            {!searchFilter && <CategorySlider />}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {categoryFilter ? `${categoryFilter}` : searchFilter ? `Search: "${searchFilter}"` : 'Popular Products'}
                    </h2>
                    {categoryFilter && (
                        <Link to="/" className="text-primary hover:underline text-sm font-medium">Clear Filter</Link>
                    )}
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No products found.</p>
                        <Link to="/" className="mt-4 inline-block text-primary font-medium hover:underline">Browse all products</Link>
                    </div>
                ) : (
                    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {products.map((product) => {
                            const isLiked = isInWishlist(product._id);
                            return (
                                <div key={product._id} className="product-card bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-primary/20 dark:hover:border-primary/20 hover:shadow-2xl transition-all duration-300 group overflow-hidden relative flex flex-col h-full opacity-0 translate-y-8">
                                    {/* Discount Badge */}
                                    <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full z-10 shadow-lg shadow-red-500/30">
                                        FRESH ARRIVAL
                                    </div>

                                    {/* Like Button */}
                                    <button
                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist(product); }}
                                        className={`absolute top-4 right-4 z-30 p-2 rounded-full backdrop-blur-sm transition-all transform translate-y-2 group-hover:translate-y-0 ${isLiked ? 'bg-white text-red-500 opacity-100' : 'bg-white/80 dark:bg-gray-800/80 text-gray-400 opacity-0 group-hover:opacity-100 dark:hover:bg-gray-700 hover:text-red-500 hover:bg-white'}`}
                                    >
                                        <Star className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                                    </button>

                                    <Link to={`/product/${product._id}`} className="relative h-64 bg-gray-50 dark:bg-gray-800 overflow-hidden group-hover:shadow-lg transition-all duration-500">
                                        <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 will-change-transform"
                                        />
                                    </Link>

                                    <div className="p-5 flex-grow flex flex-col relative z-20 bg-white dark:bg-gray-900 transition-colors">
                                        <Link to={`/product/${product._id}`}>
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                                {product.name}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-gray-400 dark:text-gray-500 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

                                        <div className="mt-auto flex items-end justify-between gap-2">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Price</span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                                                        ₹{product.items && product.items.length > 0 ? product.items[0].price : 0}
                                                    </span>
                                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400"> / {product.items && product.items.length > 0 ? product.items[0].unit : 'kg'}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => addToCart(product, 1, product.items[0].unit)}
                                                className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center hover:bg-secondary transition-all shadow-lg shadow-primary/30 transform active:scale-95 group/btn"
                                            >
                                                <ShoppingCart className="h-6 w-6 group-hover/btn:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
