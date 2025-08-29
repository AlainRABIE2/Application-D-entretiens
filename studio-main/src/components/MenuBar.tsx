"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
// import { logout } from '@/lib/actions';
import { UserCircle, LogOut } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { supabase } from '@/lib/supabaseClient';

export default function MenuBar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email ?? null);
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
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary transition-opacity hover:opacity-80">
              entretiens
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            {userEmail ? (
              <>
                <div className="flex items-center gap-2">
                  <UserCircle className="h-6 w-6 text-muted-foreground" />
                  <span className="hidden sm:inline text-sm font-medium">{userEmail}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={async () => {
                    await supabase.auth.signOut();
                    setUserEmail(null);
                    window.location.href = '/login';
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Déconnexion</span>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Se connecter</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register">S'inscrire</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
