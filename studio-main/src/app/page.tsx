import { getUser } from '@/lib/auth';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function Home() {
    const user = await getUser();

    if (!user) {
        // This should be handled by middleware, but as a fallback:
        redirect('/login');
    }

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
                        Vous êtes connecté en tant que <span className="font-medium text-primary">{user?.username}</span>.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
