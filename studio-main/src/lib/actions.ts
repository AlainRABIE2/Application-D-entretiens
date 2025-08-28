'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { LoginSchema, RegisterSchema } from '@/lib/definitions';
import { createClient } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

export async function login(prevState: any, formData: FormData) {
    const validatedFields = LoginSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = validatedFields.data;

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return {
            message: error.message || 'Email ou mot de passe invalide.',
        };
    }

    redirect('/');
}

export async function register(prevState: any, formData: FormData) {
    const validatedFields = RegisterSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password, username } = validatedFields.data;

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username },
        },
    });

    if (error) {
        return {
            message: error.message || 'Erreur lors de la création du compte.',
        };
    }

    redirect('/login?message=Inscription réussie. Veuillez vérifier votre boîte mail pour confirmer votre inscription.');
}


export async function logout() {
    await supabase.auth.signOut();
    redirect('/login');
}
