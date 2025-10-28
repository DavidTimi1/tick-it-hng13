import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header, Footer } from './layout';
import { Toast } from './components';
import { useStore, useToast, SESSION_KEY } from './store';
import { LandingPage, AuthPage, Dashboard, TicketManagement } from './pages';
import type { Page } from './store';

export default function App() {
  const [page, setPage] = useState<Page>(
    (localStorage.getItem(SESSION_KEY) ? '/dashboard' : '/') as Page
  );
  const user = useStore(s => s.user);
  const logout = useStore(s => s.logout);
  const navigate = useCallback((p: Page) => setPage(p), []);
  const logoutAndNavigate = useCallback(() => { logout(); navigate('/'); }, [logout, navigate]);

  useEffect(() => {
    const isProtected = ['/dashboard', '/tickets'].includes(page);
    if (isProtected && !user) {
      useToast.getState().show('Session expired, please log in again.', 'error');
      navigate('/auth/login');
    }
  }, [page, user, navigate]);

  const content = useMemo(() => {
    if (page.startsWith('/auth')) {
      const type = page.endsWith('login') ? 'login' : 'signup';
      return <AuthPage type={type} navigate={navigate} />;
    }
    switch (page) {
      case '/dashboard': return <Dashboard navigate={navigate} />;
      case '/tickets': return <TicketManagement />;
      default: return <LandingPage navigate={navigate} />;
    }
  }, [page, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header current={page} navigate={navigate} loggedIn={!!user} logout={logoutAndNavigate} />
      <main>{content}</main>
      <Footer />
      <Toast />
    </div>
  );
}
