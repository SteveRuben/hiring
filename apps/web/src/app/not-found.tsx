"use client";

import { useState } from 'react';
import { BellRing, ChevronRight, CheckCircle2, Video, CalendarClock, BookOpen } from 'lucide-react';
import { useTranslation } from "@/components/i18n";

export default function Custom404() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: ) => {
    e.preventDefault();
    setLoading(true);
    // Simuler l'appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-sm font-medium mb-4">
            <BellRing className="h-4 w-4 mr-2" />
            {t("error.available")}
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("error.join")}
          </p>
        </div>

        {/* Formulaire d'inscription */}
        <div className="max-w-md mx-auto mb-16">
          {submitted ? (
            <div className="text-center bg-green-50 p-8 rounded-xl">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">{t("error.us")}</h2>
              <p className="text-gray-600">
              {t("error.intouch")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email"
                required
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg
                         flex items-center justify-center disabled:opacity-50 transition-colors"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {t("error.waiting")}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Fonctionnalités */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Video className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">{t("features.video.title")}</h3>
            <p className="text-gray-600">
               {t("features.video.description")}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="h-12 w-12 bg-violet-50 text-violet-600 rounded-lg flex items-center justify-center mb-4">
              <CalendarClock className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">{t("features.live.title")}</h3>
            <p className="text-gray-600">
               {t("features.live.description")}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="h-12 w-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">{t("features.learning.title")}</h3>
            <p className="text-gray-600">
            {t("features.learning.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

