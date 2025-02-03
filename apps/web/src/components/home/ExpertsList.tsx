'use client';

import { Star } from 'lucide-react';

import { useTranslation } from '@/components/i18n';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const ExpertsList = () => {
  const { t } = useTranslation();

  const experts = [
    {
      name: 'E. Wandji',
      role: 'Senior Frontend Developer',
      specialties: ['React', 'TypeScript', 'UI/UX'],
      rating: 4.9,
      sessions: 156,
    },
    {
      name: 'P. Manga',
      role: 'Marketing Expert',
      specialties: ['Marketing', 'Branding', 'Personna definition'],
      rating: 4.8,
      sessions: 203,
    },
    {
      name: 'B. Ella',
      role: 'Product Owner Expert',
      specialties: ['Design Thinking', 'Scaling', 'Attract customer'],
      rating: 4.9,
      sessions: 178,
    },
  ];

  return (
    <section id="experts" className="bg-slate-50 py-24">
      {/* <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t("experts.title")}</h2>
          <p className="text-lg text-slate-600">{t("experts.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {experts.map((expert, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">{expert.name}</h3>
                  <p className="text-slate-600">{expert.role}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{expert.rating}</span>
                    <span className="text-slate-600">
                      ({expert.sessions} {t("experts.sessions")})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {expert.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    {t("experts.viewProfile")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div> */}
    </section>
  );
};
