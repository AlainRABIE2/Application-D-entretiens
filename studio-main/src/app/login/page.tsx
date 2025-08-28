import LoginForm from './login-form';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
          Connectez-vous à votre compte
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card px-4 py-8 shadow-xl sm:rounded-lg sm:px-10">
          <Suspense fallback={<div>Chargement...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
