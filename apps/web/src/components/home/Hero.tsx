"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/components/i18n";


export const Hero = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: "💻",
      text: "Sessions de Code",
      description: "Pair programming & revues de code"
    },
    {
      icon: "🎯",
      text: "Webinaires",
      description: "Formation & partage de connaissances"
    },
    {
      icon: "🧠",
      text: "Tests & Entretiens",
      description: "Recrutement & évaluation à distance"
    },
    {
      icon: "🎤",
      text: "Communication",
      description: "Prise de parole & présentation"
    },
    {
      icon: "🎨",
      text: "Brainstorming",
      description: "Tableau blanc collaboratif"
    },
    {
      icon: "👥",
      text: "Réunions",
      description: "1:1 ou groupes avec widgets"
    },
    {
      icon: "📊",
      text: "Daily & Weekly",
      description: "Syncs avec résumés automatiques"
    },
    {
      icon: "🎉",
      text: "Team Building",
      description: "Célébrations & événements d'équipe"
    }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Arrière-plan animé avec motifs */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-violet-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/circuit.svg')] bg-repeat"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/patterns/code.svg')] bg-repeat opacity-30"></div>
        </div>
      </div>

      {/* Éléments flottants décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20" variant="secondary">
            {t("hero.beta")}
          </Badge>
          <h1 className="text-6xl font-bold mb-6 text-white">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-slate-200 mb-12 max-w-3xl mx-auto">
            {t("hero.subtitle")}
          </p>

          {/* Grille de fonctionnalités */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                text={feature.text}
                description={feature.description}
              />
            ))}
          </div>

          <div className="flex gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
              {t("hero.findExpert")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="link" className="text-white border-white hover:bg-white/10">
              {t("hero.viewDemo")}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="500+" label={t("hero.stats.experts")} />
            <StatCard value="10k+" label={t("hero.stats.sessions")} />
            <StatCard value="4.9/5" label={t("hero.stats.rating")} />
            <StatCard value="98%" label="Satisfaction" />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, text, description }: { icon: string; text: string; description: string }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all group cursor-pointer">
    <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="text-white font-semibold mb-2">{text}</div>
    <div className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
      {description}
    </div>
  </div>
);

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-white">{value}</div>
    <div className="text-slate-200">{label}</div>
  </div>
);
