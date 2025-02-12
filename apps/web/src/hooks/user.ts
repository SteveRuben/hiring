import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateUserPassword } from '@/modules/updateUserSettings.services';
import { PasswordUpdateInput, UserUpdateInput } from '@/types/user';

export const useUpdateUser = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserUpdateInput & PasswordUpdateInput) =>
      updateUserPassword.updateUser(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    },
  });
};
