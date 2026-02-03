import { Link } from 'react-router-dom';

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Shop by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat) => (
                    <Link
                        to={`/?category=${cat.name}`}
                        key={cat.name}
                        className={`${cat.color} rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-transform hover:-translate-y-1 hover:shadow-md border border-transparent hover:border-gray-100 dark:hover:border-gray-700 cursor-pointer group`}
                    >
                        <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm group-hover:scale-110 transition-transform duration-300 ring-2 ring-white dark:ring-gray-700">
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategorySlider;
