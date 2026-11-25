import React from 'react';
import { TrackOrderClient } from '@/components/track/TrackOrderClient';

export const metadata = {
  title: 'Track Your Luxury Nail Order | Sleek Polish by Ish',
  description: 'Enter your Sleek Polish order number and email to follow the 5-step handcrafted journey of your press-on nails.',
};

export default function TrackPage() {
  return <TrackOrderClient />;
}
