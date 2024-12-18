import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['din-condensed', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bghighlight: "var(--bghighlight)",
        tilebg: "var(--tilebg)",
        lcdbg: "var(--lcdbg)",
        highlight: "var(--highlight)",
        highlight2: "var(--highlight2)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
