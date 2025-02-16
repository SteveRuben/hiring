// Types

export interface Membership {
  id: number;
  group: {
    id: number;
    name: string;
    profilePictureUrl: string;
    role: 'ADMIN' | 'OWNER' | 'MEMBER';
  };
}

export interface Session {
  id: number;
  ipAddress: string;
  userAgent: string;
  city: string;
  region: string;
  timezone: string;
  countryCode: string;
  browser: string;
  operatingSystem: string;
  isCurrentSession: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Email {
  id: number;
  email: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiKey {
  id: number;
  name: string;
  apiKey: string;
  scopes: string[];
  ipRestrictions?: string[];
  referrerRestrictions?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  auth: {
    accessToken: string;
    refreshToken: string;
  };
  memberships: Membership[];
  details: {
    checkLocationOnLogin: boolean;
    countryCode: string;
    gender: string;
    id: number;
    name: string;
    prefersLanguage: string;
    prefersColorScheme: string;
    prefersReducedMotion: string;
    prefersEmailId: 1;
    profilePictureUrl: string;
    role: 'USER' | 'SUDO';
    timezone: string;
  };
}


interface ProfileData {
  name: string;
  gender: string;
  prefersLanguage: string;
  prefersColorScheme: string;
  prefersReducedMotion: string;
  profilePictureFile?: FileList;
  identificationFile?: FileList;
  profilePictureUrl?: string;
  attributes?: {
    idDocumentUrl?: string;
  };
  id?: number;
}