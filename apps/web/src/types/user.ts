export interface PasswordUpdateInput {
  currentPassword?: string;
  newPassword?: string;
  ignorePwnedPassword?: boolean;
}

export interface UserUpdateInput {
  fullName?: string;
  nickname?: string;
  email?: string;
  pronouns?: string;
  country?: string;
  timezone?: string;
}
