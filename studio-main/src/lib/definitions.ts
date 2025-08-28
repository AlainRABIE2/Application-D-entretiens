import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Veuillez saisir une adresse e-mail valide.' }),
  password: z.string().min(1, { message: 'Le mot de passe est requis.' }),
});

export const RegisterSchema = z.object({
    username: z.string().min(3, { message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères.' }),
    email: z.string().email({ message: 'Veuillez saisir une adresse e-mail valide.' }),
    password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' }),
});

export type User = {
    id: string;
    username: string;
    email: string;
}
