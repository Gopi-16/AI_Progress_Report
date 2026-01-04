import { ReactNode } from 'react';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: ReactNode;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  onLogout?: () => void;
}

export function DashboardLayout({ children, user, onLogout }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={!!user} user={user} onLogout={onLogout} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
