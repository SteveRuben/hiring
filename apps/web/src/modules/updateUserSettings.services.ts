import { api } from '@/lib/api/api';
import { PasswordUpdateInput, UserUpdateInput } from '@/types/user';

export class UpdateUserPassword {
  private userId = 2;

  async updateUser(id: number, data: UserUpdateInput & PasswordUpdateInput) {
    try {
      const response = await api.patch(`/users/${this.userId}/api-keys/${id}`, data);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Utilisateur non trouvé');
      }
      if (error.response?.status === 400) {
        throw new Error(error.response.data.message || 'Données invalides');
      }
      throw error;
    }
  }
}

export const updateUserPassword = new UpdateUserPassword();
