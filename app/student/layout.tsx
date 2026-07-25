import { Metadata } from 'next';
import ChatWidget from '../components/ChatWidget';

export const metadata: Metadata = {
  title: 'Your Desk — EZEE',
  description: 'Upload your notes, customise every print, and pick up when ready.',
  openGraph: {
    title: 'Your Desk — EZEE',
    description: 'Upload your notes, customise every print, and pick up when ready.',
    type: 'website',
  },
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
}

