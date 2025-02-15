import { z } from 'zod';

export const inviteMemberSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
