'use client'

import { FC } from 'react'
import { ErrorCodes } from '@/constants/error-codes';
import { useRouter } from 'next/navigation'
import { GenericErrorPage } from './generic-error-page'

interface ErrorPageProps {
  type: ErrorCodes
  errorMessage?: string
}

export const ErrorPage: FC<ErrorPageProps> = ({ type, errorMessage }) => {
  const router = useRouter()

  const handleHomeClick = () => {
    router.push('/')
  }

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
        }
      case ErrorCodes.INVALID_LINK:
        return {
          buttonText: 'Take me home',
          quoteText: 'This link is invalid',
          title: 'Invalid Link',
          body: 'The link you tried to access is invalid. Please check the link and try again.',
          imgSrc: '/images/link-broken.png',
          imgAltText: 'Invalid link illustration',
        }
      case ErrorCodes.PAGE_NOT_FOUND:
        return {
          buttonText: 'Take me home',
          quoteText: 'Page not found',
          title: '404 - Page Not Found',
          body: 'The page you are looking for does not exist.',
          imgSrc: '/images/404.png',
          imgAltText: '404 illustration',
        }
      case ErrorCodes.ROOM_NOT_FOUND:
        return {
          buttonText: 'Take me home',
          quoteText: 'Room not found',
          title: 'Room Not Found',
          body: 'The room you are looking for does not exist.',
          imgSrc: '/images/room-not-found.png',
          imgAltText: 'Room not found illustration',
        }
      default:
        return {
          buttonText: 'Return home',
          quoteText: 'Unexpected error',
          title: 'Something went wrong',
          body: 'An unexpected error occurred. Please try again later.',
          imgSrc: '/images/unexpected.png',
          imgAltText: 'Unexpected error illustration',
        }
    }
  }

  return (
    <GenericErrorPage
      {...getErrorContent()}
      errorMessage={errorMessage}
      onClick={handleHomeClick}
    />
  )
}