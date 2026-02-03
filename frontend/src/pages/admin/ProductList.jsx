import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data);
            setLoading(false);
        } catch (error) {
            toast.error('Error fetching products');
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`/api/products/${id}`, config);
                toast.success('Product deleted');
                fetchProducts();
            } catch (error) {
                toast.error('Error deleting product');
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post('/api/products', {}, config);
            toast.success('Product placeholder created');
            navigate(`/admin/product/${data._id}/edit`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error creating product');
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Products Inventory</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{products.length} items found</p>
                </div>

                <div className="flex w-full md:w-auto gap-4">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={createProductHandler}
                        className="bg-primary hover:bg-secondary text-white font-bold py-2 px-6 rounded-lg flex items-center shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5"
                    >
                        <Plus className="mr-2 h-5 w-5" /> Add New
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
                            <thead className="bg-gray-50/50 dark:bg-gray-900/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Variants / Price</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                {filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-100 dark:border-gray-600">
                                                    <img className="h-full w-full object-cover" src={product.image} alt="" onError={(e) => { e.target.src = "https://via.placeholder.com/50" }} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{product.name}</div>
                                                    <div className="text-xs text-gray-400">ID: {product._id.substring(20, 24)}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {product.items && product.items.length > 0 ? (
                                                <div className="space-y-1">
                                                    {product.items.map((i, idx) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            <span className="font-medium text-gray-900 dark:text-gray-200">₹{i.price}</span>
                                                            <span className="text-gray-400 text-xs">/ {i.unit}</span>
                                                            {i.stock < 10 && <span className="text-xs text-red-500 font-bold">(Low Stock: {i.stock})</span>}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 italic">No variants</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-3">
                                                <Link to={`/admin/product/${product._id}/edit`} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                                    <Edit className="h-5 w-5" />
                                                </Link>
                                                <button onClick={() => deleteHandler(product._id)} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
