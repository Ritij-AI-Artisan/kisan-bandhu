import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kisan Bandhu',
    short_name: 'Kisan Bandhu',
    description: 'Har kadam, kisan ke saath — one trusted partner for every step of the farm season.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#143D1E',
    background_color: '#FAF7F0',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
