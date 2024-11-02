/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "custom-gray": "#666666",
                "custom-border-input": "#A09F9F",
                "custom-red": "#F37671",
                "custom-black": "#303030",
                "btn-feed-gray": "#8E8E8E",
                "btn-border-feed-gray": "#E2E2E2",
            },
            boxShadow: {
                'top': '0 -1px 10px rgba(0, 0, 0, 0.2)',
                'bottom': '0 1px 10px rgba(0, 0, 0, 0.2)',
            },
        },
    },
    plugins: [],
}