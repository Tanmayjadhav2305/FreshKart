import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import { ArrowLeft, Upload, Plus, Trash2, Save, Image as ImageIcon } from 'lucide-react';

const ProductEdit = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0); // Legacy support
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [items, setItems] = useState([{ unit: 'kg', price: '', stock: '' }]);

    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { user } = useAuthStore();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setName(data.name);
                setImage(data.image);
                setCategory(data.category);
                setDescription(data.description);
                if (data.items && data.items.length > 0) {
                    setItems(data.items);
                }
                setLoading(false);
            } catch (error) {
                toast.error('Error fetching product details');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const { data } = await axios.post('/api/upload', formData);
            setImage(data);
            setUploading(false);
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error(error);
            setUploading(false);
            toast.error('Image upload failed');
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`/api/products/${id}`, {
                name,
                image,
                category,
                description,
                items
            }, config);

            toast.success('Product updated');
            navigate('/admin/products');
        } catch (error) {
            toast.error('Error updating product');
        }
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { unit: 'kg', price: '', stock: '' }]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    if (loading) return <div className="flex justify-center p-10"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/admin/products" className="inline-flex items-center text-gray-500 hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
            </Link>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
                        <p className="text-sm text-gray-500 mt-1">Update product information and inventory</p>
                    </div>
                    <button onClick={submitHandler} className="bg-primary hover:bg-secondary text-white font-bold py-2.5 px-6 rounded-lg flex items-center shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5">
                        <Save className="h-5 w-5 mr-2" /> Save Changes
                    </button>
                </div>

                <form onSubmit={submitHandler} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column: Basic Info */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="e.g. Fresh Red Tomatoes"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                            <select
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="Vegetables">Vegetables</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Dairy">Dairy</option>
                                <option value="Bakery">Bakery</option>
                                <option value="Eggs & Meat">Eggs & Meat</option>
                                <option value="Grains">Grains</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none h-32 resize-none"
                                placeholder="Product details..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Right Column: Image & Variants */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative group">
                                {image ? (
                                    <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                                        <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white font-medium">Click to change</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-8 text-gray-400">
                                        <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                                        <p>No image uploaded</p>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={uploadFileHandler}
                                />
                                <div className="mt-2 text-sm text-gray-500 flex items-center justify-center gap-2">
                                    <Upload className="h-4 w-4" /> {uploading ? 'Uploading...' : 'Upload Image'}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-semibold text-gray-700">Pricing & Variants</label>
                                <button type="button" onClick={addItem} className="text-xs text-primary font-bold hover:underline flex items-center">
                                    <Plus className="h-3 w-3 mr-1" /> Add Variant
                                </button>
                            </div>
                            <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                {items.map((item, index) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        <div className="flex-1">
                                            <input
                                                placeholder="Unit (e.g. kg)"
                                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20"
                                                value={item.unit}
                                                onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-1 relative">
                                            <span className="absolute left-3 top-2 text-gray-400 text-xs">₹</span>
                                            <input
                                                placeholder="Price"
                                                type="number"
                                                className="w-full pl-6 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20"
                                                value={item.price}
                                                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                placeholder="Stock"
                                                type="number"
                                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20"
                                                value={item.stock}
                                                onChange={(e) => handleItemChange(index, 'stock', Number(e.target.value))}
                                            />
                                        </div>
                                        <button type="button" onClick={() => removeItem(index)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                {items.length === 0 && <p className="text-sm text-red-500 italic">Please add at least one pricing variant.</p>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductEdit;
