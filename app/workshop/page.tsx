import React from 'react';
import { Metadata } from 'next';
import WorkshopRoom from '../components/vendor/WorkshopRoom';

export const metadata: Metadata = {
  title: 'The Workshop — EZEE',
  description: 'Manage your print queue, stations, and earnings.',
  openGraph: {
    title: 'The Workshop — EZEE',
    description: 'Manage your print queue, stations, and earnings.',
    type: 'website',
  },
};

export default function VendorPage() {
  return (
    <main>
      <WorkshopRoom />
    </main>
  );
}
