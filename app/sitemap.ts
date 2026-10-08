import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';
import { PRODUCTS } from '@/content/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/farmers', '/partners', '/products', '/hubs', '/technology', '/investors', '/about', '/contact', '/register', '/privacy', '/terms', '/credits'];
  return [...pages.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.7 })), ...PRODUCTS.map((p) => ({ url: `${SITE_URL}/products/${p.slug}`, priority: 0.5 }))];
}
