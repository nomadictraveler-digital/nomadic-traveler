import './globals.css';
import type { ReactNode } from 'react';
export const metadata={title:'Nomadic Traveler | Global Travel Tracker',description:'Track Bangladesh districts and countries around the world.'};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body>{children}</body></html>}
