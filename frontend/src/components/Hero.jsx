import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Leaf, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const banners = [
    {
        id: 1,
        title: "Farm Fresh Vegetables",
        subtitle: "Harvested daily and delivered to your doorstep within 24 hours.",
        cta: "Shop Now",
        link: "/?category=Vegetables",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2000&auto=format&fit=crop",
        theme: "from-emerald-950 via-emerald-800/90 to-transparent"
    },
    {
        id: 2,
        title: "Juicy Organic Fruits",
        subtitle: "Experience the sweetness of nature with our hand-picked selection.",
        cta: "Explore Fruits",
        link: "/?category=Fruits",
        image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=2000&auto=format&fit=crop",
        theme: "from-orange-950 via-amber-700/90 to-transparent"
    },
    {
        id: 3,
        title: "Healthy Dairy & Eggs",
        subtitle: "Pure, wholesome milk and free-range eggs for your family.",
        cta: "View Dairy",
        link: "/?category=Dairy",
        image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=2000&auto=format&fit=crop",
        theme: "from-blue-950 via-indigo-800/90 to-transparent"
    }
];

const Hero = () => {
    const [current, setCurrent] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(".hero-text-reveal",
            { y: 30, opacity: 0, filter: "blur(10px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "power2.out" }
        );
        gsap.fromTo(".hero-image",
            { scale: 1.15 },
            { scale: 1, duration: 6, ease: "power2.out" }
        );
    }, { scope: containerRef, dependencies: [current] });

    return (
        <div ref={containerRef} className="relative w-full h-[550px] lg:h-[650px] overflow-hidden rounded-[2.5rem] mx-auto mt-6 shadow-2xl shadow-gray-200 dark:shadow-black/50 max-w-[1400px]">
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 z-10 pointer-events-none'}`}
                >
                    <div className="absolute inset-0">
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="hero-image w-full h-full object-cover"
                        />
                        {/* Premium Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${banner.theme} opacity-90`}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    </div>

                    <div className="relative h-full container mx-auto px-6 md:px-12 flex flex-col justify-center">
                        <div className="max-w-3xl pt-10">
                            {/* Premium Badge */}
                            <div className="hero-text-reveal inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-1.5 text-white mb-6 shadow-lg">
                                <Leaf className="h-4 w-4 text-emerald-400 fill-emerald-400" />
                                <span className="text-sm font-bold tracking-wider uppercase">100% Organic Certified</span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="hero-text-reveal text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tight drop-shadow-xl font-['Outfit']">
                                {banner.title.split(' ').map((word, i) => (
                                    <span key={i} className="inline-block mr-4">{word}</span>
                                ))}
                            </h1>

                            <p className="hero-text-reveal text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-xl leading-relaxed font-light">
                                {banner.subtitle}
                            </p>

                            {/* CTA Actions */}
                            <div className="hero-text-reveal flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                                <Link
                                    to={banner.link}
                                    className="group relative inline-flex justify-center items-center gap-3 bg-white text-gray-900 font-extrabold py-4 px-10 rounded-full hover:bg-emerald-50 transition-all transform hover:-translate-y-1 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] overflow-hidden"
                                >
                                    <span className="relative z-10">Shop Now</span>
                                    <ArrowRight className="relative z-10 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Link>

                                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white/20 bg-gray-300 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex text-yellow-400">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                        </div>
                                        <span className="text-xs text-white/80 font-medium">5k+ Reviews</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Stylish Pagination */}
            <div className="absolute bottom-10 right-10 flex space-x-2 z-30">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-1.5 transition-all duration-500 rounded-full ${index === current ? 'w-10 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
