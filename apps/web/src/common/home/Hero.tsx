"use client";

import { Button } from "@prep-ai/ui/components/ui/button";
import { Badge } from "@prep-ai/ui/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "../i18n";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-slate-50 py-24">
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
              {t("hero.findExpert")}
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
