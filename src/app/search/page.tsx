
import PlanoSearch from '@/components/plano-search';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Button asChild variant="outline" size="icon">
          <Link href="/">
            <Home className="h-4 w-4" />
            <span className="sr-only">Volver al inicio</span>
          </Link>
        </Button>
        <ThemeToggle />
      </header>
      <main className="flex-grow flex items-stretch">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6 flex flex-col">
            <PlanoSearch />
        </div>
      </main>
       <footer className="text-center py-6 border-t border-border mt-auto">
        <p className="text-sm text-muted-foreground">
          SuperLink Hub &copy; {new Date().getFullYear()} | EOPNP Supervisión
        </p>
      </footer>
    </div>
  );
}
