# إعدادات ملفات Robots.txt و Sitemap.ts في Next.js

### 1. ملف `src/app/robots.ts`:
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/messages', '/wallet'],
      },
    ],
    sitemap: 'https://elmodarag.com/sitemap.xml',
  };
}
```

### 2. ملف `src/app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://elmodarag.com';
  
  // Static Routes
  const staticRoutes = [
    '',
    '/app',
    '/app/materials',
    '/app/today',
    '/app/study-plan',
    '/app/exam-simulator',
    '/app/gpa',
    '/app/registration',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticRoutes];
}
```