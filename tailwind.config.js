const colors = require("tailwindcss/colors");
const defaultConfig = require("tailwindcss/defaultConfig");

module.exports = {
    purge: {
        content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
        css: ["./src/index.css"],
        safelist: [
            "react-select__indicator",
            "Toastify__toast-body",
            /menu-item/,
            /red/,
            /gray/,
            /bg-yellow/,
            /bg-green/,
        ],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            trans: "transparent",
            current: "currentColor",
            primary: "#00B4D8",
            secondary: "#0077B6",
            bright: "#90E0EF",
            brighter: "rgba(144, 224, 239, 0.5)",
            white: colors.white,
            black: "#060D16",
            gray: {
                DEFAULT: colors.gray[50],
                100: colors.gray[100],
                200: colors.gray[200],
                300: colors.gray[300],
                400: colors.gray[400],
                500: colors.gray[500],
                600: colors.gray[600],
                700: colors.gray[700],
            },
            blue: {
                light: "rgba(140, 203, 237, 0.5)",
            },
            red: {
                light: colors.red[200],
                DEFAULT: "#D80000",
                dark: colors.red[600],
            },
            green: {
                lighter: "rgba(147, 240, 147, 0.5)",
                light: "#90EF93",
                DEFAULT: "#00D800",
                dark: "#237A23",
            },
            yellow: {
                light: "#F5F5DC",
                DEFAULT: "#D8D800",
                dark: colors.yellow[600],
            },
        },
        fontFamily: {
            sans: ["'Poppins'", "Arial", "sans-serif"],
        },
        borderRadius: Object.assign(defaultConfig.theme.borderRadius, {
            sm: "3px",
            DEFAULT: "5px",
        }),
        extend: {
            spacing: {
                25: "6.25rem",
                21.5: "5.375rem",
                26: "6.5rem",
            },
            minWidth: {
                2: "2rem",
            },
            fontSize: {
                xxs: "0.625rem",
                smd: "0.8125rem",
            },
            boxShadow: {
                md: "0 3px 6px rgba(0, 0, 0, 0.15)",
                lg: "0 5px 10px rgba(0, 0, 0, 0.15)",
            },
        },
    },
    variants: {
        extend: {
            margin: ["first", "last"],
            padding: ["first", "last"],
            borderWidth: ["last"],
            borderRadius: ["last", "first"],
            backgroundColor: ["active", "even"],
            textColor: ["active"],
            borderColor: ["active"],
            display: ["hover", "group-hover"],
        },
    },
    plugins: [],
};
