import { Link } from 'react-router-dom';
import { Package, ShoppingBag, Users, TrendingUp, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Products Card */}
                <Link to="/admin/products" className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform group-hover:scale-150 duration-500"></div>
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Products</p>
                            <h2 className="text-3xl font-bold text-gray-900">Inventory</h2>
                        </div>
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <Package className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                        <span className="text-primary font-medium flex items-center gap-1">Manage <TrendingUp className="h-3 w-3" /></span>
                        <span className="mx-2">•</span>
                        <span>Update stock & prices</span>
                    </div>
                </Link>

                {/* Orders Card */}
                <Link to="/admin/orders" className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full transition-transform group-hover:scale-150 duration-500"></div>
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
                            <h2 className="text-3xl font-bold text-gray-900">Orders</h2>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <ShoppingBag className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                        <span className="text-blue-600 font-medium flex items-center gap-1">View All <TrendingUp className="h-3 w-3" /></span>
                        <span className="mx-2">•</span>
                        <span>Process & deliverables</span>
                    </div>
                </Link>

                {/* Users Card (Coming Soon) */}
                <div className="group relative bg-gray-50 rounded-2xl p-6 border border-dashed border-gray-200 opacity-70">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Registered Users</p>
                            <h2 className="text-3xl font-bold text-gray-400">Users</h2>
                        </div>
                        <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                            <Users className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-400">
                        <span>Customer management coming soon</span>
                    </div>
                </div>
            </div>

            {/* Quick Stats or Recent Activity could go here in a real app */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
                    <p className="text-white/80 max-w-xl">
                        Ready to manage your store? Use the cards above to update inventory or check incoming orders.
                    </p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10">
                    <ShoppingBag className="h-64 w-64 transform translate-x-12 translate-y-12" />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
