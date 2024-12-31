"use client";

import { Button } from "@prep-ai/ui/components/ui/button";


export default function Home() {
  return (
   <div>
        <div className="text-center text-3xl font-bold dark:text-white md:text-7xl">
          Your personal chef & tools
        </div>
        <div className="py-4 text-base font-extralight dark:text-neutral-200 md:text-4xl">
          Transform your eating habits.
        </div>
        <Button variant="destructive">Click Me</Button>;
   </div>
  );
}
