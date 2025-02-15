import { api } from '@/lib/api/api';
interface PasswordResetResponse {
  queued: boolean;
}

class ForgetpasswordService {
  async requestReset(email: string): Promise<PasswordResetResponse> {
    try {
      // Obtention de l'URL d'origine pour le lien de réinitialisation
      const origin = window.location.origin;

      // Envoi de la demande de réinitialisation
      const response = await api.post<PasswordResetResponse>('/auth/forgot-password', {
        email,
        origin,
      });

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la modification du mot de passe', error);
      throw error;
    }
  }
}

// Création de l'instance de service
export const ForgotpasswordService = new ForgetpasswordService();
export default ForgotpasswordService;
