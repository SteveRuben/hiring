// Données fictives pour la démonstration
export const stats = {
  totalChallenges: 24,
  activeChallenges: 18,
  totalUsers: 1256,
  completedSubmissions: 4872,
};

// Données fictives pour les activités récentes
export const recentActivities = [
  {
    id: 1,
    type: 'challenge',
    action: t('activityActions.created'),
    name: 'Algorithmes de tri',
    time: t('timeAgo.hours', { count: 2 }),
  },
  {
    id: 2,
    type: 'user',
    action: t('activityActions.registered'),
    name: 'Marie Dupont',
    time: t('timeAgo.hours', { count: 3 }),
  },
  {
    id: 3,
    type: 'submission',
    action: t('activityActions.completed'),
    name: 'Structures de données avancées',
    time: t('timeAgo.hours', { count: 5 }),
  },
  {
    id: 4,
    type: 'challenge',
    action: t('activityActions.modified'),
    name: 'Introduction à la programmation fonctionnelle',
    time: t('timeAgo.days', { count: 1 }),
  },
  {
    id: 5,
    type: 'submission',
    action: t('activityActions.started'),
    name: 'Optimisation et complexité algorithmique',
    time: t('timeAgo.days', { count: 1 }),
  },
];
