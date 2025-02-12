export interface PasswordUpdateInput {
  currentPassword?: string;
  newPassword?: string;
}

export interface UserUpdateInput {
  fullName?: string;
  nickname?: string;
  email?: string;
  pronouns?: string;
  country?: string;
  timezone?: string;
}
