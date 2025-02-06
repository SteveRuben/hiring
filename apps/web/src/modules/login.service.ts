import axios from 'axios';

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
  private apiUrl: string;

  constructor() {
    // Vérification que la variable d'environnement existe
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error('NEXT_PUBLIC_API_URL must be defined in .env.local');
    }

    this.apiUrl = process.env.NEXT_PUBLIC_API_URL;
  }
  async register(data: Login): Promise<TokenResponse | TotpTokenResponse> {
    try {
      // // Récupération de l'adresse IP
      // const ipResponse = await fetch('https://api.ipify.org?format=json');
      // const { ip } = await ipResponse.json();

      // Envoi des données à l'API avec l'IP
      const response = await axios.post<TokenResponse | TotpTokenResponse>(
        `${this.apiUrl}/auth/login`,
        data
      );

      return response.data;
    } catch (error: any) {
      // Gestion des erreurs
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur lors du Log In');
      }
      throw error;
    }
  }
}

// Création de l'instance de service
export const loginService = new LoginService();
export default loginService;
