import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Leaf, Star, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const banners = [
    {
        id: 1,
        title: "Farm Fresh Vegetables",
        subtitle: "Harvested daily and delivered to your doorstep within 24 hours.",
        cta: "Shop Now",
        link: "/?category=Vegetables",
        // Using reliable Unsplash Source collection for vegetables
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2000&auto=format&fit=crop",
        theme: "from-green-900/90 to-green-600/20"
    },
    {
        id: 2,
        title: "Juicy Organic Fruits",
        subtitle: "Experience the sweetness of nature with our hand-picked selection.",
        cta: "Explore Fruits",
        link: "/?category=Fruits",
        image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=2000&auto=format&fit=crop",
        theme: "from-orange-900/90 to-orange-600/20"
    },
    {
        id: 3,
        title: "Healthy Dairy & Eggs",
        subtitle: "Pure, wholesome milk and free-range eggs for your family.",
        cta: "View Dairy",
        link: "/?category=Dairy",
        image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=2000&auto=format&fit=crop",
        theme: "from-blue-900/90 to-blue-600/20"
    }
];

const Hero = () => {
    const [current, setCurrent] = useState(0);
    const containerRef = useRef(null);

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    // GSAP Animation for slide changes
    useGSAP(() => {
        const tl = gsap.timeline();

        // Animate text elements on slide change
        tl.fromTo(".hero-text-reveal",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
        );

        // Animate image scale slightly
        gsap.fromTo(".hero-image",
            { scale: 1.1 },
            { scale: 1, duration: 6, ease: "power1.out" }
        );

    }, { scope: containerRef, dependencies: [current] });

    return (
        <div ref={containerRef} className="relative w-full h-[500px] lg:h-[600px] overflow-hidden rounded-3xl mx-auto mt-4 max-w-[1400px] px-4 md:px-0">
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === current ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 z-10 pointer-events-none'
                        }`}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="hero-image w-full h-full object-cover"
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${banner.theme}`}></div>
                    </div>

                    {/* Content Container */}
                    <div className="relative h-full container mx-auto px-6 lg:px-12 flex flex-col justify-center">
                        <div className="max-w-2xl">

                            {/* Badge */}
                            <div className="hero-text-reveal inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3 py-1.5 sm:px-4 text-white mb-4 sm:mb-6">
                                <Leaf className="h-3 w-3 sm:h-4 sm:w-4 fill-green-400 text-green-400" />
                                <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">100% Organic & Fresh</span>
                            </div>

                            <h1 className="hero-text-reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
                                {banner.title}
                            </h1>
                            <p className="hero-text-reveal text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-8 max-w-lg leading-relaxed drop-shadow-md">
                                {banner.subtitle}
                            </p>

                            <div className="hero-text-reveal flex flex-col sm:flex-row gap-4">
                                <Link
                                    to={banner.link}
                                    className="inline-flex justify-center items-center gap-2 sm:gap-3 bg-white text-gray-900 font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl text-sm sm:text-base"
                                >
                                    {banner.cta} <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                </Link>
                                <div className="hidden sm:flex items-center gap-4 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-white">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
                                    </div>
                                    <span className="text-sm font-medium">Top Rated Service</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`transition-all duration-300 rounded-full ${index === current
                            ? 'w-10 h-3 bg-white shadow-lg'
                            : 'w-3 h-3 bg-white/40 hover:bg-white/70'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent z-10"></div>
        </div>
    );
};

export default Hero;
