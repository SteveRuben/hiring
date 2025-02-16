'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserPage({ params: { slug } }: { params: { slug: string } }) {
  const router = useRouter();

  useEffect(() => {
    router.push(`/users/${slug}/profile`);
  }, [router, slug]);

  return null;
}