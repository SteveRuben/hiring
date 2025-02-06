import axios from 'axios';

interface PasswordResetResponse {
  queued: boolean;
}

class ForgetpasswordService {
  private apiUrl: string;

  constructor() {
    // Vérification que la variable d'environnement existe
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error('NEXT_PUBLIC_API_URL must be defined in .env.local');
    }

    this.apiUrl = process.env.NEXT_PUBLIC_API_URL;
  }
  async requestReset(email: string): Promise<PasswordResetResponse> {
    try {
      // Obtention de l'URL d'origine pour le lien de réinitialisation
      const origin = window.location.origin;

      // Envoi de la demande de réinitialisation
      const response = await axios.post<PasswordResetResponse>(
        `${this.apiUrl}/auth/forgot-password`,
        {
          email,
          origin,
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error("Aucun compte n'est associé à cet email");
        }
        throw new Error(
          error.response?.data?.message ||
            'Erreur lors de la demande de réinitialisation du mot de passe'
        );
      }
      throw error;
    }
  }
}

// Création de l'instance de service
export const ForgotpasswordService = new ForgetpasswordService();
export default ForgotpasswordService;
