"use client";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
export default function Home() {
  // Déconnexion
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };
  // Suppression d'utilisateur
  const handleDeleteUser = async (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    await supabase.from("Utilisateur").delete().eq("id", id);
    // Rafraîchir la liste
    const { data } = await supabase.from("Utilisateur").select("id, nom, prenom, email, role");
    if (data) setUtilisateurs(data);
  };
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<number | null>(null);
  const [utilisateurs, setUtilisateurs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // Hooks pour l'édition
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{ nom: string; prenom: string; email: string; role: number }>({ nom: '', prenom: '', email: '', role: 2 });

  // Fonctions de gestion d'édition
  const handleEdit = (u: any) => {
    setEditId(u.id);
    setEditData({ nom: u.nom, prenom: u.prenom, email: u.email, role: u.role });
  };
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };
  const handleEditSave = async (id: number) => {
    await supabase.from("Utilisateur").update(editData).eq("id", id);
    setEditId(null);
    // Refresh list
    const { data } = await supabase.from("Utilisateur").select("id, nom, prenom, email, role");
    if (data) setUtilisateurs(data);
  };
  const handleResetPassword = async (email: string) => {
    await supabase.auth.resetPasswordForEmail(email);
    alert("Mail de réinitialisation envoyé à " + email);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
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
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        setUser(null);
        setRole(null);
      } else {
        fetchUser();
      }
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (role === 1) {
      const fetchUtilisateurs = async () => {
        const { data } = await supabase.from("Utilisateur").select("id, nom, prenom, email, role");
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
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
          <Button variant="outline" onClick={handleLogout}>Déconnexion</Button>
        </div>
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
            {utilisateurs.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>
                  {editId === u.id ? (
                    <input
                      name="nom"
                      value={editData.nom}
                      onChange={handleEditChange}
                      className="border px-2"
                    />
                  ) : (
                    u.nom
                  )}
                </td>
                <td>
                  {editId === u.id ? (
                    <input
                      name="prenom"
                      value={editData.prenom}
                      onChange={handleEditChange}
                      className="border px-2"
                    />
                  ) : (
                    u.prenom
                  )}
                </td>
                <td>
                  {editId === u.id ? (
                    <input
                      name="email"
                      value={editData.email}
                      onChange={handleEditChange}
                      className="border px-2"
                    />
                  ) : (
                    <a
                      href={`mailto:${u.email}`}
                      className="text-blue-600 underline"
                    >
                      {u.email}
                    </a>
                  )}
                </td>
                <td>
                  {editId === u.id ? (
                    <select
                      name="role"
                      value={editData.role}
                      onChange={handleEditChange}
                      className="border px-2"
                    >
                      <option value={1}>Admin</option>
                      <option value={2}>Utilisateur</option>
                    </select>
                  ) : (
                    u.role === 1 ? "Admin" : "Utilisateur"
                  )}
                </td>
                <td className="space-x-1">
                  {editId === u.id ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleEditSave(u.id)}
                      >
                        Enregistrer
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setEditId(null)}
                      >
                        Annuler
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" onClick={() => handleEdit(u)}>
                        Éditer
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResetPassword(u.email)}
                      >
                        Réinitialiser mot de passe
                      </Button>
                      <a href={`mailto:${u.email}`}>
                        <Button size="sm" variant="ghost">
                          Contacter
                        </Button>
                      </a>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        Supprimer
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // UTILISATEUR SIMPLE : Affiche une page de présentation
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
