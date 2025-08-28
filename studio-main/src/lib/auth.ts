import 'server-only';
import { cookies } from 'next/headers';
import type { User } from '@/lib/definitions';

// À remplacer par une logique Supabase côté client ou via API route sécurisée
export async function getUser(): Promise<User | null> {
    return null;
}
