import axios from 'axios';

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
  private apiUrl: string;

  constructor() {
    // Vérification que la variable d'environnement existe
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error('NEXT_PUBLIC_API_URL must be defined in .env.local');
    }

    this.apiUrl = process.env.NEXT_PUBLIC_API_URL;
  }
  async register(data: RegisterDto): Promise<User> {
    try {
      // // Récupération de l'adresse IP
      // const ipResponse = await fetch('https://api.ipify.org?format=json');
      // const { ip } = await ipResponse.json();

      // Envoi des données à l'API avec l'IP
      const response = await axios.post<User>(`${this.apiUrl}/auth/register`, data);

      return response.data;
    } catch (error: any) {
      // Gestion des erreurs
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          throw new Error('Un utilisateur avec cet email existe déjà');
        }
        throw new Error(error.response?.data?.message || "Erreur lors de l'enregistrement");
      }
      throw error;
    }
  }
}

// Création de l'instance de service
export const registerService = new RegisterService();
export default registerService;
