import { z } from 'zod';

export const billingSettingsSchema = z.object({
  companyName: z
    .string()
    .min(2, {
      message: "Le nom de l'entreprise doit contenir au moins 2 caractères",
    })
    .max(100, {
      message: "Le nom de l'entreprise ne peut pas dépasser 100 caractères",
    }),
  address: z
    .string()
    .min(5, {
      message: "L'adresse doit contenir au moins 5 caractères",
    })
    .max(200, {
      message: "L'adresse ne peut pas dépasser 200 caractères",
    }),
  city: z
    .string()
    .min(2, {
      message: 'La ville doit contenir au moins 2 caractères',
    })
    .max(100, {
      message: 'La ville ne peut pas dépasser 100 caractères',
    }),
  postalCode: z
    .string()
    .min(2, {
      message: 'Le code postal doit contenir au moins 2 caractères',
    })
    .max(20, {
      message: 'Le code postal ne peut pas dépasser 20 caractères',
    }),
  country: z.string().min(2, {
    message: 'Le pays doit contenir au moins 2 caractères',
  }),
  vatNumber: z.string().optional(),
  billingEmail: z.string().email({
    message: 'Veuillez entrer une adresse email valide',
  }),
  billingPrefix: z
    .string()
    .max(10, {
      message: 'Le préfixe ne peut pas dépasser 10 caractères',
    })
    .optional(),
});

export type BillingSettingsSchema = z.infer<typeof billingSettingsSchema>;
