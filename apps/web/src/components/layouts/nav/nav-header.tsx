'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { User } from '@/model';

import { MainNav } from './main-nav';
import Navbar from './nav-bar';

const NavHeader = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (token) {
          // Simuler une requête API pour obtenir les informations de l'utilisateur
          // Remplacez ceci par votre logique d'authentification réelle
          const response = await fetch('/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Token invalide ou expiré');
          }

          const userData: User = {
            auth: {
              accessToken: '',
              refreshToken: '',
            },
            details: {
              checkLocationOnLogin: false,
              countryCode: 'Sd',
              gender: 'M',
              id: 0,
              name: 'John Duchant',
              prefersLanguage: 'en',
              prefersColorScheme: '#367801',
              prefersReducedMotion: '',
              prefersEmailId: 1,
              profilePictureUrl: '',
              role: 'USER',
              timezone: '',
            },
            memberships: [],
          };
          setUser(userData);
        } else {
          const userData: User = {
            auth: {
              accessToken: '',
              refreshToken: '',
            },
            details: {
              checkLocationOnLogin: false,
              countryCode: 'Sd',
              gender: 'M',
              id: 0,
              name: 'John Duchant',
              prefersLanguage: 'en',
              prefersColorScheme: '#367801',
              prefersReducedMotion: '',
              prefersEmailId: 1,
              profilePictureUrl: '',
              role: 'USER',
              timezone: '',
            },
            memberships: [],
          };
          setUser(userData);
        }
      } catch (error) {
        console.error("Erreur de vérification d'authentification:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    // Suppression du token d'authentification
    localStorage.removeItem('authToken');
    setUser(null);
    router.push('/');
  };
  console.log(user);

  return <>{user ? <MainNav user={user} /> : <Navbar />}</>;
};

export default NavHeader;
