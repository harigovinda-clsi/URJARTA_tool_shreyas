import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'URJA RTA - Real-Time Power Grid Engine',
  description: 'All-India National Grid SCADA Telemetry & Physics Framework',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark-blue">
      <head>
        {/* Lucide Icons and MathJax external scripts fallback */}
        <script
          id="MathJax-script"
          async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        />
      </head>
      <body className="bg-[var(--bg-main)] text-[var(--text-main)] antialiased min-h-screen flex flex-col font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
