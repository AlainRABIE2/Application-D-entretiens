"use client";
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getUser();
            setEmail(data.user?.email ?? null);
        };
        getSession();
        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            getSession();
        });
        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    return (
        <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
            <Card className="w-full max-w-md text-center shadow-xl">
                <CardHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-4 text-2xl font-bold">Bienvenue sur entretiens!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        {email
                            ? <>Vous êtes connecté en tant que <span className="font-medium text-primary">{email}</span>.</>
                            : <>Vous n'êtes pas connecté.</>
                        }
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
