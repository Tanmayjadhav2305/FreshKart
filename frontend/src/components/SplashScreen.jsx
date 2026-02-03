import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

const SplashScreen = ({ onFinish }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onFinish, 500); // Wait for fade out animation
        }, 2500); // Show for 2.5 seconds

        return () => clearTimeout(timer);
    }, [onFinish]);

    // Removed early return to allow fade out animation to play
    // if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-green-50 dark:bg-gray-900 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="flex flex-col items-center animate-bounce-short">
                <div className="bg-primary p-4 rounded-3xl shadow-2xl mb-6 transform scale-125">
                    <Leaf className="h-12 w-12 text-white fill-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">FreshKart</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm tracking-widest uppercase">Premium Grocery</p>
            </div>

            <div className="absolute bottom-10 flex flex-col items-center">
                <p className="text-xs text-gray-400 dark:text-gray-600 mb-1">Developed by</p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tanmay Jadhav</p>
            </div>
        </div>
    );
};

export default SplashScreen;
