export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                ssp: ["Source Sans Pro", "sans-serif"],
                lexend: ["Lexend", "sans-serif"],
            },
            transitionProperty: {
                height: "height",
                width: "width",
            },
            colors: {
                navbar: "#232323",
                dropdown: "#333333",
                card: "#2e2e2e",
                text: {
                    primary: "#f3f4f6",
                    secondary: "#cacaca",
                    dark: "#0e0e0e",
                },
                highlight: {
                    primary: "#9333ea",
                    hover: "#a855f7",
                },
                searchInput: {
                    primary: "#404040",
                    icon: "#a3a3a3",
                },
            },
            height: {
                navbar: "4rem",
            },
            spacing: {
                navbar: "4rem",
            },
        },
    },
    plugins: [],
};
