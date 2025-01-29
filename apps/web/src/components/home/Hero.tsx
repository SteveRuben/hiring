"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/components/i18n";
import { useState, useEffect } from "react";

const COLORS = [
  'from-blue-700/40 to-blue-900/40',
  'from-violet-700/40 to-violet-900/40',
  'from-indigo-700/40 to-indigo-900/40',
  'from-purple-700/40 to-purple-900/40',
];

const BackgroundShapes = () => {
  const [shapes, setShapes] = useState<Array<{
    width: number;
    height: number;
    left: number;
    top: number;
    rotate: number;
    color: string;
  }>>([]);

  useEffect(() => {
    setShapes(
      [...Array(12)].map(() => ({
        width: Math.random() * 40 + 40,
        height: Math.random() * 40 + 40,
        left: Math.random() * 100,
        top: Math.random() * 100,
        rotate: Math.random() * 360,
        color: COLORS[Math.floor(Math.random() * COLORS.length)] || 'from-blue-700/40 to-blue-900/40',
      }))
    );
  }, []);

  if (shapes.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className={`absolute bg-gradient-to-r ${shape.color} rounded-lg shadow-lg`}
          style={{
            width: `${shape.width}px`,
            height: `${shape.height}px`,
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            opacity: 0.8,
            transform: `rotate(${shape.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative bg-slate-50 py-24 overflow-hidden">
      <BackgroundShapes />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            {t("hero.beta")}
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-slate-600 mb-8">{t("hero.subtitle")}</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">
              {t("hero.getStarted")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              {t("hero.viewDemo")}
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-slate-600">{t("hero.stats.experts")}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-slate-600">{t("hero.stats.sessions")}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.9/5</div>
              <div className="text-slate-600">{t("hero.stats.rating")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};