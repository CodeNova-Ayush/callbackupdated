import { SafeClerkProvider } from "@/components/auth/SafeClerkProvider";
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Callback — Next-Gen AI Resume Builder, Analyzer & Living Agent',
  description: 'Build ATS-optimized resumes, analyze formatting and keywords, engage with Living Resume Agents, verify claims with Trust Score, and auto-tailor applications.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Grand+Hotel&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F5F9FB] text-slate-900 font-sans">
        <SafeClerkProvider publishableKey={clerkPubKey}>
          {children}
        </SafeClerkProvider>
      </body>
    </html>
  );
}