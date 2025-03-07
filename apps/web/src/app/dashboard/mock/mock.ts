export const upcomingInterviews = [
  { id: 1, name: 'Marie Dubois', position: 'UX Designer', time: '10:30', date: "Aujourd'hui" },
  {
    id: 2,
    name: 'Thomas Bernard',
    position: 'Full Stack Developer',
    time: '14:00',
    date: "Aujourd'hui",
  },
  { id: 3, name: 'Sarah Martin', position: 'Product Manager', time: '11:15', date: 'Demain' },
];

export const recentInterviews = [
  {
    id: 1,
    candidate: 'Julie Moreau',
    position: 'Front-end Developer',
    date: 'Hier',
    duration: '45 min',
    rating: 4.5,
    feedback: 'Excellentes compétences techniques, bonne communication',
    status: 'Shortlisted',
  },
  {
    id: 2,
    candidate: 'Nicolas Petit',
    position: 'Data Scientist',
    date: '23/04/2023',
    duration: '38 min',
    rating: 3.8,
    feedback: 'Bonnes connaissances techniques, communication à améliorer',
    status: 'En attente',
  },
  {
    id: 3,
    candidate: 'Anne Lefevre',
    position: 'Marketing Manager',
    date: '20/04/2023',
    duration: '52 min',
    rating: 4.2,
    feedback: 'Très bonne expérience, bonne adéquation culturelle',
    status: 'Shortlisted',
  },
];

export const performanceData = {
  overallScore: 86,
  metrics: [
    { name: 'Qualité des questions', score: 92 },
    { name: 'Écoute active', score: 88 },
    { name: 'Réduction des biais', score: 78 },
    { name: "Structure d'entretien", score: 85 },
  ],
  recentAlerts: [
    "Vous avez interrompu le candidat 8 fois pendant l'entretien",
    'Une faible diversité dans vos questions de follow-up a été détectée',
    'Considérez de laisser plus de temps aux candidats pour répondre',
  ],
};

export const suggestedQuestions = [
  "Pouvez-vous me parler d'un défi technique que vous avez résolu récemment?",
  'Comment gérez-vous les retours critiques sur votre travail?',
  'Décrivez une situation où vous avez dû collaborer avec une équipe multidisciplinaire',
  "Quelles sont vos attentes concernant la culture d'entreprise?",
  'Comment vous tenez-vous informé des dernières tendances dans votre domaine?',
];
