'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { ErrorCodes } from '@/constants/error-codes';

import { GenericErrorPage } from './generic-error-page';

interface ErrorPageProps {
  type: ErrorCodes;
  errorMessage?: string;
}

export const ErrorPage: FC<ErrorPageProps> = ({ type, errorMessage }) => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push('/');
  };
  const handleLoginClick = () => {
    router.push('/login');
  };
  const handleRegisterClick = () => {
    router.push('/register');
  };

  const getErrorContent = () => {
    switch (type) {
      case ErrorCodes.LINK_EXPIRED:
        return {
          buttonText: 'Take me home',
          quoteText: 'This link has expired',
          title: 'Link Expired',
          body: 'The link you tried to access has expired. Please request a new link.',
          imgSrc: '/images/link-broken.png',
          imgAltText: 'Link expired illustration',
        };
      case ErrorCodes.INVALID_LINK:
        return {
          buttonText: 'Take me home',
          quoteText: 'This link is invalid',
          title: 'Invalid Link',
          body: 'The link you tried to access is invalid. Please check the link and try again.',
          imgSrc: '/images/link-broken.png',
          imgAltText: 'Invalid link illustration',
        };

      case ErrorCodes.ROOM_NOT_FOUND:
        return {
          buttonText: 'Take me home',
          quoteText: 'Room not found',
          title: 'Room Not Found',
          body: 'The room you are looking for does not exist.',
          imgSrc: '/images/room-not-found.png',
          imgAltText: 'Room not found illustration',
        };
      case ErrorCodes.AUTH_ERROR:
        return {
          buttonText: 'Réessayer',
          quoteText: "Erreur d'authentification",
          title: 'Échec de la connexion',
          body: 'Impossible de vous connecter. Veuillez vérifier vos identifiants.',
          imgSrc: '/images/auth-error.png',
          imgAltText: "Erreur d'authentification",
        };
      case ErrorCodes.REGISTER_ERROR:
        return {
          buttonText: 'Réessayer',
          quoteText: "Erreur lors de l'enregistrement",
          title: "Echec d'enregistrement",
          body: 'Impossible de vous enregistrer, verifier les donnees fournies.',
          imgSrc: '/images/network-error.png',
          imgAltText: "Erreur d'enregistrement",
        };
      case ErrorCodes.NETWORK_ERROR:
        return {
          buttonText: 'Réessayer',
          quoteText: 'Erreur réseau',
          title: 'Problème de connexion',
          body: 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.',
          imgSrc: '/images/network-error.png',
          imgAltText: 'Erreur réseau',
        };

      default:
        return {
          buttonText: 'Return home',
          quoteText: 'Unexpected error',
          title: 'Something went wrong',
          body: 'An unexpected error occurred. Please try again later.',
          imgSrc: '/images/unexpected.png',
          imgAltText: 'Unexpected error illustration',
        };
    }
  };

  return (
    <GenericErrorPage
      {...getErrorContent()}
      errorMessage={errorMessage}
      onClick={
        ErrorCodes.AUTH_ERROR
          ? handleLoginClick
          : ErrorCodes.REGISTER_ERROR
            ? handleRegisterClick
            : handleHomeClick
      }
    />
  );
};
