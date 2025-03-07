// Données fictives pour la démonstration
export const initialMembers = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    role: 'Admin',
    avatarUrl: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Felix',
    dateAdded: new Date(2023, 0, 15),
    isCurrentUser: true,
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie.martin@example.com',
    role: 'Manager',
    avatarUrl: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Marie',
    dateAdded: new Date(2023, 2, 10),
    isCurrentUser: false,
  },
  {
    id: '3',
    name: 'Thomas Bernard',
    email: 'thomas.bernard@example.com',
    role: 'Member',
    avatarUrl: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Thomas',
    dateAdded: new Date(2023, 4, 5),
    isCurrentUser: false,
  },
  {
    id: '4',
    name: 'Sophie Petit',
    email: 'sophie.petit@example.com',
    role: 'Member',
    avatarUrl: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Sophie',
    dateAdded: new Date(2023, 5, 20),
    isCurrentUser: false,
  },
];

export const activeSessions = [
  {
    device: 'Chrome sur Windows',
    location: 'Paris, France',
    ip: '192.168.1.1',
    lastActive: "Aujourd'hui à 14:30",
    current: true,
  },
  {
    device: 'Firefox sur MacOS',
    location: 'Lyon, France',
    ip: '192.168.1.2',
    lastActive: 'Hier à 18:45',
    current: false,
  },
  {
    device: 'Application mobile (iOS)',
    location: 'Marseille, France',
    ip: '192.168.1.3',
    lastActive: 'Il y a 3 jours',
    current: false,
  },
];
