"use client";

import { Code, Video, BookOpen } from "lucide-react";
import { useTranslation } from "@/components/i18n";
import { Card, CardContent } from "@/components/ui/card";

export const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Code className="h-8 w-8 text-blue-500" />,
      title: t("features.live.title"),
      description: t("features.live.description"),
    },
    {
      icon: <Video className="h-8 w-8 text-green-500" />,
      title: t("features.video.title"),
      description: t("features.video.description"),
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-500" />,
      title: t("features.learning.title"),
      description: t("features.learning.description"),
    },
  ];

  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t("features.title")}</h2>
          <p className="text-lg text-slate-600">{t("features.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mt-4 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
