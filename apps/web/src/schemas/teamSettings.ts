import { z } from 'zod';

export const teamSettingsSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Le nom de l'équipe doit contenir au moins 2 caractères",
    })
    .max(50, {
      message: "Le nom de l'équipe ne peut pas dépasser 50 caractères",
    }),
  username: z
    .string()
    .min(3, {
      message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
    })
    .max(30, {
      message: "Le nom d'utilisateur ne peut pas dépasser 30 caractères",
    })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Le nom d'utilisateur ne peut contenir que des lettres minuscules, des chiffres et des tirets",
    }),
  autoJoinDomain: z.boolean(),
  restrictToDomain: z.boolean(),
  verifiedDomains: z.array(z.string()).optional(),
});

export type TeamSettingsSchema = z.infer<typeof teamSettingsSchema>;

export const domainSchema = z.object({
  domain: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/, {
    message: 'Veuillez entrer un nom de domaine valide (ex: exemple.com)',
  }),
});

export type DomainSchema = z.infer<typeof domainSchema>;
