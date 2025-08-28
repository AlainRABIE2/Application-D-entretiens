'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { register } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

function RegisterButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Créer un compte
        </Button>
    );
}

export default function RegisterForm() {
  const [state, dispatch] = useActionState(register, undefined);

  return (
    <form action={dispatch} className="space-y-6">
      <div>
        <Label htmlFor="username">Nom d'utilisateur</Label>
        <div className="mt-2">
          <Input id="username" name="username" type="text" autoComplete="username" required />
        </div>
        {state?.errors?.username &&
            <p className="text-sm font-medium text-destructive mt-2">{state.errors.username[0]}</p>
        }
      </div>
      
      <div>
        <Label htmlFor="email">Adresse e-mail</Label>
        <div className="mt-2">
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        {state?.errors?.email &&
            <p className="text-sm font-medium text-destructive mt-2">{state.errors.email[0]}</p>
        }
      </div>

      <div>
        <Label htmlFor="password">Mot de passe</Label>
        <div className="mt-2">
          <Input id="password" name="password" type="password" autoComplete="new-password" required />
        </div>
        {state?.errors?.password &&
            <p className="text-sm font-medium text-destructive mt-2">{state.errors.password[0]}</p>
        }
      </div>

      {state?.message && (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <div>
        <RegisterButton />
      </div>

      <p className="mt-2 text-center text-sm text-muted-foreground">
        Vous avez déjà un compte?{' '}
        <Link href="/login" className="font-medium text-primary transition-colors hover:text-primary/80">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
