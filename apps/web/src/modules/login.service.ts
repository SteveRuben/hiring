import { api } from '@/lib/api/api';

export type MfaMethod = 'NONE' | 'SMS' | 'TOTP' | 'EMAIL';

// Types pour le DTO d'inscription
export interface Login {
  email: string;
  password: string;
}

// Interface pour les donnees retournees
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
export interface TotpTokenResponse {
  totpToken: string;
  type: MfaMethod;
  multiFactorRequired: true;
}
class LoginService {
  async register(data: Login): Promise<TokenResponse | TotpTokenResponse> {
    try {
      // // Récupération de l'adresse IP
      // const ipResponse = await fetch('https://api.ipify.org?format=json');
      // const { ip } = await ipResponse.json();

      // Envoi des données à l'API avec l'IP
      const response = await api.post<TokenResponse | TotpTokenResponse>('/auth/login', data);

      return response.data;
    } catch (error: any) {
      // Gestion des erreurs
      console.error('Erreur lors de la connexion', error);
      throw error;
    }
  }
}

// Création de l'instance de service
export const loginService = new LoginService();
export default loginService;
