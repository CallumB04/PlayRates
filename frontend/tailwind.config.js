export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    safelist: [
        ...["8", "12", "16", "20", "24", "28", "32", "40"].map(
            (size) => `size-${size}`
        ),
        ...["sm", "md", "lg", "xl"].flatMap((bp) =>
            ["8", "12", "16", "20", "24", "28", "32", "40"].map(
                (size) => `${bp}:size-${size}`
            )
        ),
        ...["1", "2", "3", "4"].map((size) => `border-[${size}px]`),
        ...["sm", "md", "lg", "xl"].flatMap((bp) =>
            ["1", "2", "3", "4"].map((size) => `${bp}:border-[${size}px]`)
        ),
    ],
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
                popup: {
                    start: "#333333",
                    end: "#383838",
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
