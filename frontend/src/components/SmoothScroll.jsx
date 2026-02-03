import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const SmoothScroll = () => {
    const lenisRef = useRef(null);
    const { pathname } = useLocation();

    useEffect(() => {
        // Disable Lenis on mobile devices for better performance
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) return;

        const lenis = new Lenis({
            duration: 1.2, // Standard for smooth feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1, // Reset to standard for consistency
            smoothTouch: false,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Scroll to top on route change
    // Scroll to top on route change
    const prevPathname = useRef(pathname);

    useEffect(() => {
        if (prevPathname.current !== pathname) {
            if (lenisRef.current) {
                lenisRef.current.scrollTo(0, { immediate: true });
            } else {
                window.scrollTo(0, 0);
            }
            prevPathname.current = pathname;
        }
    }, [pathname]);

    return null;
};

export default SmoothScroll;
