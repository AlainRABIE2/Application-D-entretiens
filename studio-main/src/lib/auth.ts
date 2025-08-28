import 'server-only';
import { cookies } from 'next/headers';
import type { User } from '@/lib/definitions';

export async function getUser(): Promise<User | null> {
    const session = cookies().get('session')?.value;
    if (!session) return null;

    // In a real app, you would verify the session and fetch user data from a database.
    // For this demo, we'll just parse the session cookie.
    try {
        const parsed = JSON.parse(session);
        return parsed.user as User;
    } catch {
        return null;
    }
}
