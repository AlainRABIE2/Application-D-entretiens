"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Se connecter
    </Button>
  );
}

export default function LoginForm() {
  const [state, dispatch] = useActionState(login, undefined);
  const searchParams = useSearchParams();
  const registrationMessage = searchParams.get("message");

  return (
    <div className="space-y-6">
      {registrationMessage && (
        <Alert
          variant="default"
          className="border-primary/20 bg-primary/10 text-primary"
        >
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{registrationMessage}</AlertDescription>
        </Alert>
      )}
      <form action={dispatch} className="space-y-6">
        <div>
          <Label htmlFor="email">Adresse e-mail</Label>
          <div className="mt-2">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="utilisateur@exemple.com"
            />
          </div>
          {state?.errors?.email && (
            <p className="text-sm font-medium text-destructive mt-2">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="text-sm">
              <span className="text-muted-foreground">
                {" "}
                (utilisez "password")
              </span>
            </div>
          </div>
          <div className="mt-2">
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          {state?.errors?.password && (
            <p className="text-sm font-medium text-destructive mt-2">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {state?.message && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        <div>
          <LoginButton />
        </div>

        <p className="mt-2 text-center text-sm text-muted-foreground">
          Pas encore membre?{" "}
          <Link
            href="/register"
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            Inscrivez-vous maintenant
          </Link>
        </p>
      </form>
    </div>
  );
}
