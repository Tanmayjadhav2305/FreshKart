/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Enable class-based dark mode
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            colors: {
                primary: '#059669', // Emerald 600
                secondary: '#10b981', // Emerald 500
                accent: '#f59e0b', // Amber 500
                dark: '#1e293b', // Slate 800
                light: '#f8fafc', // Slate 50
            }
        },
    },
    plugins: [],
}
