
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductList from './pages/admin/ProductList';
import ProductEdit from './pages/admin/ProductEdit';
import OrderList from './pages/admin/OrderList';
import Shipping from './pages/Shipping';
import PlaceOrder from './pages/PlaceOrder';
import Profile from './pages/Profile';
import OrderDetails from './pages/OrderDetails';
import Footer from './components/Footer';
import ProtectedRoute from './components/PrivateRoute'; // I named it PrivateRoute
import AdminRoute from './components/AdminRoute';
import { Toaster } from 'react-hot-toast';
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
      <SmoothScroll />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/place-order" element={<PlaceOrder />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="product/:id/edit" element={<ProductEdit />} />
            <Route path="orders" element={<OrderList />} />
          </Route>

        </Routes>
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
