import api from '@/lib/api/api';

// Types pour le DTO d'inscription
export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  checkLocationOnLogin: boolean;
  ignorePwnedPassword?: boolean;
}

// Interface pour l'utilisateur retourné
export interface User {
  id: number;
  name: string;
  email: string;
}

class RegisterService {
  async register(data: RegisterDto): Promise<User> {
    try {
      // // Récupération de l'adresse IP
      // const ipResponse = await fetch('https://api.ipify.org?format=json');
      // const { ip } = await ipResponse.json();

      // Envoi des données à l'API avec l'IP
      const response = await api.post<User>('/auth/register', data);

      return response.data;
    } catch (error: any) {
      // Gestion des erreurs
      console.error("Erreur lors de l'enregistrement du compte", error);
      throw error;
    }
  }
}

// Création de l'instance de service
export const registerService = new RegisterService();
export default registerService;
