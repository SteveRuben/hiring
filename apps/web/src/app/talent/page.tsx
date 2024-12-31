// src/app/talent/page.tsx
"use client";
import { useTranslation } from "../../common/i18n";
import TalentForm from "../../common/talent/talent-form";


export default function TalentPage() {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">
            {t('talent.title')}
          </h1>
          <p className="text-lg text-slate-600">
            {t('talent.subtitle')}
          </p>
        </div>
        <TalentForm />
      </div>
    </div>
  );
}