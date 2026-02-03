import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
    { name: "Vegetables", image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=200", color: "bg-green-50 dark:bg-green-900/20" },
    { name: "Fruits", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=200", color: "bg-orange-50 dark:bg-orange-900/20" },
    { name: "Dairy", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=200", color: "bg-blue-50 dark:bg-blue-900/20" },
    { name: "Grains", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=200", color: "bg-yellow-50 dark:bg-yellow-900/20" },
    { name: "Eggs & Meat", image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=200", color: "bg-red-50 dark:bg-red-900/20" },
    { name: "Bakery", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=200", color: "bg-amber-50 dark:bg-amber-900/20" },
];

const CategorySlider = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Shop by Category</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Freshest picks for your daily needs.</p>
                </div>
                <Link to="/" className="hidden sm:flex items-center text-primary font-bold hover:translate-x-1 transition-transform">
                    View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
            </div>

            <div className="overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
                <div className="flex gap-4 sm:gap-6 min-w-max">
                    {categories.map((cat) => (
                        <Link
                            to={`/?category=${cat.name}`}
                            key={cat.name}
                            className="group relative flex flex-col items-center justify-center w-28 sm:w-36 h-36 sm:h-44 rounded-[2rem] bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/60 dark:border-gray-700/60 shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className={`absolute inset-0 rounded-[2rem] ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-lg overflow-hidden border-2 border-white dark:border-gray-600 group-hover:scale-110 transition-transform duration-300">
                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="relative z-10 mt-3 sm:mt-4 font-bold text-sm sm:text-base text-gray-700 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-white transition-colors">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default CategorySlider;
