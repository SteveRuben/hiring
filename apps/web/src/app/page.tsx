"use client";


import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div>
        <div className="text-center text-3xl font-bold dark:text-white md:text-7xl">
          Your personal chef & tools
        </div>
        <div className="py-4 text-base font-extralight dark:text-neutral-200 md:text-4xl">
          Transform your eating habits.
        </div>
   </div>
  );
}
