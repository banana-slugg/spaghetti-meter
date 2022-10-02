/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],

    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#66CC8A",
                    secondary: "#377CFB",
                    accent: "#EA5234",
                    neutral: "#1B1D1D",
                    "base-100": "#212121",
                    info: "#3ABFF8",
                    success: "#36D399",
                    warning: "#FBBD23",
                    error: "#F87272",
                },
            },
        ],
    },
};
