'use client';
import { ExpertsList, Features, Hero } from '@/components/home';
import { ContactForm } from '@/components/layouts/footer/contact';
import { Footer } from '@/components/layouts/footer/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <ExpertsList />
      <Footer />
    </main>
  );
}
