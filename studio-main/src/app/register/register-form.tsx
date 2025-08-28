"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    // 1. Création du compte Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) {
      setError(signUpError.message || "Erreur lors de la création du compte.");
      setLoading(false);
      return;
    }
    // 2. Ajout dans la table Utilisateur (id auto-incrémenté, auth_id = uuid Supabase)
    const userId = data.user?.id;
    if (userId) {
      const { error: dbError } = await supabase.from("Utilisateur").insert({
        auth_id: userId,
        nom,
        prenom,
        email, // Ajout du champ email
        // Ajoute d'autres champs si besoin (ex: role)
      });
      if (dbError) {
        setError(dbError.message || "Erreur lors de l'ajout dans la base de données.");
        setLoading(false);
        return;
      }
    }
    setSuccess("Inscription réussie ! Veuillez vérifier votre boîte mail pour confirmer votre inscription.");
    setLoading(false);
    setEmail("");
    setPassword("");
    setNom("");
    setPrenom("");
    setTimeout(() => router.push("/login?message=Inscription réussie. Veuillez vérifier votre boîte mail pour confirmer votre inscription."), 2000);
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-zinc-900 shadow-lg p-8 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">Créer un compte</h2>
        {success && (
          <Alert variant="default" className="mb-4 border-primary/20 bg-primary/10 text-primary">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="nom">Nom</Label>
            <Input
              id="nom"
              name="nom"
              type="text"
              required
              placeholder="Votre nom"
              value={nom}
              onChange={e => setNom(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="prenom">Prénom</Label>
            <Input
              id="prenom"
              name="prenom"
              type="text"
              required
              placeholder="Votre prénom"
              value={prenom}
              onChange={e => setPrenom(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="utilisateur@exemple.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-2"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Créer un compte
          </Button>
        </form>
      </div>
    </div>
  );
}
