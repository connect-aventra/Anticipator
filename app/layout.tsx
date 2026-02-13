import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Anticipator',
    description: 'Anticipator intelligently routes every request to the cheapest model that maintains your quality standards.',
    icons: {
        icon: '/icon.svg',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
                <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            tailwind.config = {
                                darkMode: "class",
                                theme: {
                                    extend: {
                                        colors: {
                                            "primary": "#22c55e",
                                            "background-light": "#FAFAFA",
                                            "background-dark": "#050505",
                                            "brand-black": "#0A0A0A",
                                            "brand-cream": "#F2EDE4",
                                        },
                                        fontFamily: {
                                            "display": ["Inter", "serif"]
                                        },
                                        borderRadius: {
                                            "DEFAULT": "0.25rem",
                                            "lg": "0.5rem",
                                            "xl": "0.75rem",
                                            "full": "9999px"
                                        },
                                    },
                                },
                            }
                        `,
                    }}
                />
            </head>
            <body className="font-display">
                {children}
            </body>
        </html>
    );
}
