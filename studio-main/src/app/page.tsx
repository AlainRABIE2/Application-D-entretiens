"use client";
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
export default function Home() {
    const [user, setUser] = useState<any>(null);
    const [role, setRole] = useState<number | null>(null);
    const [utilisateurs, setUtilisateurs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                // Correction : filtre bien sur auth_id
                const { data, error } = await supabase
                    .from("Utilisateur")
                    .select("role")
                    .eq("auth_id", user.id)
                    .single();
                if (data) setRole(data.role);
            }
            setLoading(false);
        };
        fetchUser();
        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            fetchUser();
        });
        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (role === 1) {
            const fetchUtilisateurs = async () => {
                const { data, error } = await supabase.from("Utilisateur").select("id, nom, prenom, email, role");
                if (data) setUtilisateurs(data);
            };
            fetchUtilisateurs();
        }
    }, [role]);

    if (loading) return <div>Chargement...</div>;

    if (!user) {
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
                        <p className="text-muted-foreground">Vous n'êtes pas connecté.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (role === 1) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>
                <table className="w-full border">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Rôle</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utilisateurs.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.nom}</td>
                                <td>{u.prenom}</td>
                                <td>{u.email}</td>
                                <td>{u.role === 1 ? "administrateur" : "utilisateur"}</td>
                                <td>
                                    <Button variant="outline" size="sm">Éditer</Button>{" "}
                                    <Button variant="destructive" size="sm">Supprimer</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
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
                        Vous êtes connecté en tant qu'utilisateur standard.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}