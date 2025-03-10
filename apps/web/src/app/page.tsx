'use client';
import { ExpertsList, Features, Hero } from '@/components/home';
import MainFooter from '@/components/layouts/footer/main-footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <ExpertsList />
      <MainFooter />
    </main>
  );
}
