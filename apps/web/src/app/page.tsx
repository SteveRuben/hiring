// 'use client';
// import { ExpertsList, Features, Hero } from '@/components/home';

// export default function Home() {
//   return (
//     <main className="min-h-screen">
//       <Hero />
//       <Features />
//       <ExpertsList />
//     </main>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import {
  BarChart2,
  Bell,
  ChevronDown,
  FileText,
  Link2,
  Menu,
  Monitor,
  Shield,
  Smartphone,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const featureCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -10,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { duration: 0.2 },
    },
  };

  // Counter animation for stats
  const Counter = ({ value = '21', duration = 2, decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (countRef.current) {
        observer.observe(countRef.current);
      }

      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!isVisible) return;

      let start = 0;
      const end = Number.parseInt(value);
      const stepTime = Math.abs(Math.floor((duration * 1000) / end));

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) {
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }, [value, duration, isVisible]);

    return <span ref={countRef}>{count.toFixed(decimals)}</span>;
  };

  // Intersection Observer for active section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const options = {
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Floating animation for hero elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  };

  // Particle animation for hero background
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl hidden sm:inline-block">HiringSolution</span>
            </Link>
          </motion.div>
          <nav className="hidden md:flex gap-6">
            {['Fonctionnalités', 'Témoignages', 'faq', 'contact'].map((section, index) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={`#${section}`}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : ''
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex gap-4"
          >
            <Button variant="outline" size="sm" className="transition-transform hover:scale-105">
              <Link href={'/connexion'}>Se connecter</Link>
            </Button>
            <Button
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-transform hover:scale-105"
            >
              Essayer Gratuitement
            </Button>
          </motion.div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="container py-4 md:hidden"
          >
            <nav className="flex flex-col space-y-4">
              {['Fonctionnalités', 'Témoignages', 'faq', 'contact'].map((section) => (
                <Link
                  key={section}
                  href={`#${section}`}
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              ))}
              <div className="flex gap-4 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Se connecter
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Essayer Gratuitement
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 hero-gradient text-white relative overflow-hidden">
          <ParticleBackground />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    Le recrutement optimisé : rapide, structuré et sans biais.
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-white/80 md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  >
                    De la présélection à l'évaluation, notre plateforme automatise et sécurise tout
                    votre processus.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col sm:flex-row gap-2 min-[400px]:gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <Button
                    size="lg"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all hover:scale-105"
                  >
                    Essayer Gratuitement
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-black hover:bg-white/20 transition-all hover:scale-105"
                  >
                    Demander une Démo
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                className="mx-auto lg:ml-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                whileHover={{ rotate: -2 }}
              >
                <motion.div animate={floatingAnimation}>
                  <Image
                    src="/images/engage.jpg"
                    width={550}
                    height={550}
                    alt="Interface de l'application HiringSolution"
                    className="rounded-lg shadow-xl"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* App Presentation */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Une solution SaaS puissante
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Qui optimise et automatise le recrutement, accessible depuis n'importe où.
                </p>
              </div>
              <motion.div
                className="mx-auto w-full max-w-3xl py-12"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="/images/engage.jpg"
                  width={1200}
                  height={600}
                  alt="Interface de l'application avec fonctionnalités clés"
                  className="rounded-lg shadow-xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Fonctionnalités */}
        <section id="Fonctionnalités" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Fonctionnalités Principales
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez comment notre plateforme transforme votre processus de recrutement.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  icon: <FileText className="h-6 w-6" />,
                  title: 'CV Screening Intelligent',
                  description:
                    'Analyse automatique des CVs et algorithmes de scoring objectifs pour identifier les meilleurs candidats.',
                },
                {
                  icon: <Monitor className="h-6 w-6" />,
                  title: 'Évaluations Complètes',
                  description:
                    'Coding Game, Design Test, Behavioral Test, Writing Test avec scoring objectif et réduction des biais.',
                },
                {
                  icon: <Bell className="h-6 w-6" />,
                  title: 'Notifications & Automatisation',
                  description:
                    'Rappels automatiques pour recruteurs et candidats avec suivi des étapes en temps réel.',
                },
                {
                  icon: <BarChart2 className="h-6 w-6" />,
                  title: 'Tableau de Bord & Suivi',
                  description:
                    'Interface intuitive pour suivre la progression des candidats avec accès rapide aux notes et feedbacks.',
                },
                {
                  icon: <Link2 className="h-6 w-6" />,
                  title: 'Intégration avec HRMS',
                  description:
                    "Compatible avec Workday, SAP SuccessFactors, Oracle HCM et API ouverte pour faciliter l'intégration.",
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: 'Sécurité & Conformité',
                  description:
                    'Stockage sécurisé des CVs, notes et transcriptions avec conformité RGPD & HIPAA.',
                },
                {
                  icon: <Smartphone className="h-6 w-6" />,
                  title: 'Expérience Mobile First',
                  description:
                    "Application optimisée pour le mobile avec possibilité d'évaluer et de suivre les candidats en déplacement.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={featureCardVariants}
                  whileHover="hover"
                  className="group relative overflow-hidden rounded-lg border bg-background p-6 shadow-lg transition-all"
                >
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(var(--primary), 0.2)' }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Témoignages */}
        <section id="Témoignages" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Témoignages & Études de Cas
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez comment nos clients ont transformé leur processus de recrutement.
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="rounded-lg border bg-background p-6 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Image
                      src="/images/person.jpg"
                      width={60}
                      height={60}
                      alt="Photo de profil"
                      className="rounded-full"
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold">Sophie Martin</h3>
                    <p className="text-sm text-muted-foreground">Directrice RH, TechCorp</p>
                  </div>
                </div>
                <blockquote className="mt-4">
                  <p className="text-muted-foreground">
                    "Nous avons réduit notre temps de recrutement de 40% tout en améliorant la
                    qualité de nos embauches. L'automatisation du screening initial nous a permis de
                    nous concentrer sur les entretiens qui comptent vraiment."
                  </p>
                </blockquote>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="rounded-lg border bg-background p-6 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Image
                      src="/images/person.jpg"
                      width={60}
                      height={60}
                      alt="Photo de profil"
                      className="rounded-full"
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold">Thomas Dubois</h3>
                    <p className="text-sm text-muted-foreground">
                      Responsable Talent Acquisition, FinanceGroup
                    </p>
                  </div>
                </div>
                <blockquote className="mt-4">
                  <p className="text-muted-foreground">
                    "La standardisation des évaluations a considérablement réduit les biais dans
                    notre processus. Nous avons maintenant une équipe plus diverse et performante
                    grâce à cette approche objective."
                  </p>
                </blockquote>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-lg border bg-background p-6 shadow-lg lg:col-span-2"
              >
                <h3 className="text-xl font-bold mb-4">Étude de cas : GlobalTech</h3>
                <div className="grid gap-6 md:grid-cols-2 items-center">
                  <div>
                    <ul className="space-y-2">
                      <motion.li
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                        <p>
                          <span className="font-bold">Temps de recrutement</span> : Réduit de 45
                          jours à <Counter value="21" /> jours
                        </p>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                        <p>
                          <span className="font-bold">Taux de rétention</span> : Augmenté de 68% à{' '}
                          <Counter value="92" />% après 1 an
                        </p>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                        <p>
                          <span className="font-bold">Coût par embauche</span> : Réduit de{' '}
                          <Counter value="30" />%
                        </p>
                      </motion.li>
                      <motion.li
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                          <ChevronDown className="h-4 w-4" />
                        </div>
                        <p>
                          <span className="font-bold">Satisfaction des candidats</span> : Score NPS
                          passé de 45 à <Counter value="82" />
                        </p>
                      </motion.li>
                    </ul>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src="/images/graphiq.jpg"
                      width={500}
                      height={300}
                      alt="Graphique des résultats"
                      className="rounded-lg"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Questions Fréquentes
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tout ce que vous devez savoir sur notre plateforme de recrutement.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl py-12"
            >
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: 'Combien de temps faut-il pour implémenter la solution ?',
                    answer:
                      "Notre solution peut être déployée en 48 heures. L'intégration complète avec vos systèmes existants peut prendre entre 1 et 3 semaines selon la complexité de votre infrastructure.",
                  },
                  {
                    question: 'Comment assurez-vous la réduction des biais dans le recrutement ?',
                    answer:
                      "Nos algorithmes sont conçus pour évaluer uniquement les compétences pertinentes pour le poste. Nous utilisons des techniques d'anonymisation et des évaluations standardisées pour garantir que tous les candidats sont jugés sur les mêmes critères objectifs.",
                  },
                  {
                    question: 'La plateforme est-elle conforme au RGPD ?',
                    answer:
                      'Oui, notre plateforme est entièrement conforme au RGPD. Nous avons mis en place des mesures strictes pour protéger les données personnelles, y compris le chiffrement, la minimisation des données et des politiques claires de conservation des données.',
                  },
                  {
                    question: "Quels types d'évaluations proposez-vous ?",
                    answer:
                      "Nous proposons une gamme complète d'évaluations, notamment des tests techniques (coding, design), des évaluations comportementales, des tests de rédaction, et des simulations de situations professionnelles. Toutes nos évaluations sont personnalisables selon vos besoins spécifiques.",
                  },
                  {
                    question: 'Comment fonctionne votre modèle de tarification ?',
                    answer:
                      "Nous proposons plusieurs formules d'abonnement basées sur le nombre de postes à pourvoir et la taille de votre entreprise. Tous nos forfaits incluent un support client dédié et des mises à jour régulières. Contactez-nous pour obtenir un devis personnalisé.",
                  },
                ].map((item, index) => (
                  <AccordionItem key={index} value={`item-${index + 1}`}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </motion.div>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Prêt à transformer votre recrutement ?
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Contactez-nous pour une démonstration personnalisée ou pour discuter de vos
                    besoins spécifiques.
                  </p>
                </div>
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Bell className="h-5 w-5" />
                    </div>
                    <p>Réponse garantie sous 24h</p>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Monitor className="h-5 w-5" />
                    </div>
                    <p>Démonstration personnalisée</p>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Shield className="h-5 w-5" />
                    </div>
                    <p>Essai gratuit de 14 jours</p>
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-lg border bg-background p-6 shadow-lg"
              >
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Nom
                      </label>
                      <Input
                        id="name"
                        placeholder="Entrez votre nom"
                        className="transition-all focus:scale-[1.01]"
                      />
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Entrez votre email"
                        className="transition-all focus:scale-[1.01]"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label
                      htmlFor="company"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Entreprise
                    </label>
                    <Input
                      id="company"
                      placeholder="Nom de votre entreprise"
                      className="transition-all focus:scale-[1.01]"
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Comment pouvons-nous vous aider ?"
                      className="min-h-[120px] transition-all focus:scale-[1.01]"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    >
                      Demander une Démo
                    </Button>
                  </motion.div>
                  <motion.p
                    className="text-xs text-muted-foreground text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    En soumettant ce formulaire, vous acceptez notre{' '}
                    <Link href="#" className="underline underline-offset-2">
                      politique de confidentialité
                    </Link>
                    .
                  </motion.p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 lg:py-32 hero-gradient text-white relative overflow-hidden">
          <ParticleBackground />
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Commencez dès aujourd'hui
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Rejoignez les entreprises qui transforment leur recrutement avec HiringSolution.
                </p>
              </div>
              <motion.div
                className="flex flex-col sm:flex-row gap-2 min-[400px]:gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Essayer Gratuitement
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-black   hover:bg-white/20"
                  >
                    Voir la Démo
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-6 py-12 px-4 md:px-6 md:flex-row md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 md:w-1/3"
          >
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">HiringSolution</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              La solution SaaS qui transforme le recrutement en un processus rapide, structuré et
              sans biais.
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
                  label: 'Facebook',
                },
                {
                  icon: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.4 3 5c2.2 1.6 4.6 2.5 7 2.6-1-1.6-1-3.3 0-5C12 .5 16 0 17 2c.9 0 1.8-.3 2.6-.7C19.1 3.1 18 4 17 4h5z',
                  label: 'Twitter',
                },
                {
                  icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z',
                  label: 'LinkedIn',
                },
              ].map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d={social.icon}></path>
                    </svg>
                    <span className="sr-only">{social.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:flex-1">
            {[
              {
                title: 'Produit',
                links: ['Fonctionnalités', 'Tarifs', 'Témoignages', 'FAQ'],
              },
              {
                title: 'Entreprise',
                links: ['À propos', 'Blog', 'Carrières', 'Contact'],
              },
              {
                title: 'Légal',
                links: ['Confidentialité', 'Conditions', 'Cookies'],
              },
            ].map((column, columnIndex) => (
              <motion.div
                key={columnIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: columnIndex * 0.1 }}
                className="space-y-3"
              >
                <h3 className="text-sm font-medium">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 px-4 md:px-6 md:flex-row">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs text-muted-foreground"
            >
              &copy; {new Date().getFullYear()} HiringSolution. Tous droits réservés.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xs text-muted-foreground"
            >
              Conçu avec passion en France
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
}
