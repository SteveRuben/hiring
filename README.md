# Prep AI Platform

Prep AI est une plateforme de mise en relation entre experts et apprenants, facilitant l'apprentissage personnalisé à travers diverses modalités d'interaction et d'évaluation.

## 🎯 Fonctionnalités Principales

### Système de Mise en Relation Expert/Apprenant

- **Recherche d'Experts**

  - Filtrage par domaine d'expertise (Web, UX/UI, ML, RH, Prise de parole)
  - Système de matching basé sur les objectifs d'apprentissage
  - Consultation des disponibilités en temps réel
  - Première séance gratuite

- **Profils Experts**
  - Présentation détaillée des compétences
  - Historique des sessions et évaluations
  - Calendrier de disponibilité
  - Tarification personnalisée

### Types de Sessions

- **Sessions Individuelles**

  - Consultation one-to-one
  - Support personnalisé
  - Suivi de progression

- **Sessions de Groupe**
  - Webinaires interactifs
  - Ateliers pratiques
  - Breakout rooms pour travaux en sous-groupes
  - Capacité maximale configurable

### Outils Interactifs

- **Coding Environment**

  - Éditeur de code en temps réel
  - Support multi-langages
  - Tests et validation automatisés
  - Partage de snippets

- **Design Workspace**

  - Tableau blanc collaboratif
  - Outils de wireframing
  - Partage d'écran
  - Annotations en temps réel

- **Système d'Évaluation**
  - QCM personnalisables
  - Tests de comportement
  - Exercices pratiques
  - Suivi de progression

### Gestion des Sessions

- **Planification**

  - Réservation de créneaux
  - Gestion des disponibilités
  - Rappels automatiques
  - Confirmation de présence

- **Contenu**
  - Enregistrement des sessions
  - Replay disponible
  - Ressources attachées
  - Notes partagées

## 🛠 Architecture Technique

### Stack Technologique

```
Frontend: NextJS
Backend: NestJS
Documentation: Docusaurus
Base de données: PostgreSQL
ORM: Prisma
Monorepo: Turborepo
```

### Structure du Projet

#### Apps and Packages

- `api`: a [NestJS](https://nestjs.com/) app
- `web`: a [Next.js](https://nextjs.org) app
- `ui`: a stub React component library used by `web`.
- `config`: `eslint`, `nginx` and `tailwind` (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

```
prep-ai/
├── apps/
│   ├── web/                 # Application NextJS
│   │   ├── src/
│   │   │   ├── components/  # Composants React
│   │   │   ├── pages/      # Routes Next.js
│   │   │   └── styles/     # Styles globaux
│   │
│   ├── api/                 # API NestJS
│   │   ├── src/
│   │   │   ├── modules/    # Modules NestJS
│   │   │   ├── services/   # Services métier
│   │   │   └── controllers/# Contrôleurs API
│   │
│   └── docs/               # Documentation Docusaurus
│
├── packages/
│   ├── database/           # Couche données
│   │   ├── prisma/        # Schéma et migrations
│   │   └── src/           # Client Prisma partagé
│   │
│   ├── ui/                # Composants partagés
│   │   ├── components/    # Composants UI réutilisables
│   │   └── styles/       # Thème et styles partagés
│   │
│   └── shared/           # Code partagé
│       ├── types/        # Types TypeScript
│       └── utils/        # Utilitaires communs
│
├── package.json          # Configuration racine
└── turbo.json           # Configuration Turborepo
```

This is fullstack turborepo starter. It comes with the following features.

- ✅ Turborepo
- ✅ Nestjs
  - ✅ Env Config with Validation
  - ✅ Prisma
- ✅ NextJS
  - ✅ Tailwind
  - ✅ Redux Toolkit Query
- ✅ Testing using Jest
- ✅ Github Actions
- ✅ Reverse Proxy using Nginx
- ✅ Docker Integration
- ✅ Postgres Database
- ✅ Package scripts using NPS

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Utilities

This turborepo has some additional tools already setup for you:

- [Node Package Scripts](https://github.com/sezna/nps#readme) for automation scripts
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

This starter kit is using turborepo and yarn workspaces for monorepo workflow.

### Prerequisites

- Install nps by running

```
npm i -g nps
```

- Make sure docker and docker-compose are
  installed. Refer to docs for your operating system.

### Configure Environment

- Frontend
  - `cd apps/web && cp .env.example .env`
- Backend
  - `cd apps/api && cp .env.example .env`

### Install Dependencies

Make sure you are at root of the project and just run

```
nps prepare
```

### Build

To build all apps and packages, run the following command at the root of project:

```
nps build
```

### Develop

To develop all apps and packages, run the following command at the root of project:

```
nps dev
```

The app should be running at `http://localhost` with reverse proxy configured.

## Other available commands

Run `nps` in the terminal to see list of all available commands.

# balaSpace.com
https://cmdn.io/
# https://kwanso.com/


# kindly reminder concerning geo-ip