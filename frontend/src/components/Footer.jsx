import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <span className="text-white font-bold text-2xl">F</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Fresh<span className="text-primary">Kart</span></h2>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                            Delivering farm-fresh organic vegetables, fruits, and dairy directly from local farmers to your table within 24 hours.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                                <a key={index} href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300 transform hover:-translate-y-1">
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {['Home', 'About Us', 'Shop', 'Cart', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-primary transition-colors"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Contact Us</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">Address</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">123 Green Earth Avenue, Organic City, Nature State, 560001</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">Phone</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">+91 98765 43210</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white">Email</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">hello@freshkart.com</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Newsletter</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Subscribe to get daily updates on new products and special offers.</p>
                        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-800 dark:text-gray-200"
                                />
                                <button type="submit" className="absolute right-2 top-2 p-1.5 bg-primary text-white rounded-lg shadow-md hover:bg-secondary transition-colors">
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 dark:text-gray-500">We prioritize your privacy.</p>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        &copy; {currentYear} <span className="font-bold text-gray-900 dark:text-white">FreshKart</span>. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <Link to="/" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <p className="flex items-center gap-1">
                            Made by Tanmay Jadhav <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
