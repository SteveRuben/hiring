"use client";

import { ExpertsList, Features, Hero } from "../common/home";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <ExpertsList />
   </main>
  );
}
