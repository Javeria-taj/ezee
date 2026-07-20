import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — EZEE',
  description: 'Sign in to access your print desk or vendor workshop.',
  openGraph: {
    title: 'Sign In — EZEE',
    description: 'Sign in to access your print desk or vendor workshop.',
    type: 'website',
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
