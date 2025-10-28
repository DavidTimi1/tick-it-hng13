import React from 'react';
import { Button } from './components';
import type { Page } from './store';

export const Header: React.FC<{ current: Page; navigate: (p: Page) => void; loggedIn: boolean; logout: () => void }> = ({
  current,
  navigate,
  loggedIn,
  logout,
}) => (
  <header className="border-b bg-white/80 backdrop-blur-sm">
    <div className="max-w-[1440px] mx-auto flex justify-between items-center h-16 px-4">
      <button onClick={() => navigate('/')} className="text-xl font-bold">Tick-it</button>
      <div className="flex gap-3 items-center">
        {!loggedIn ? (
          <>
            <Button variant="ghost" size="sm" onClick={() => navigate('/auth/login')}>Login</Button>
            <Button size="sm" onClick={() => navigate('/auth/signup')}>Get Started</Button>
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
        )}
      </div>
    </div>
  </header>
);

export const Footer = () => (
  <footer className="border-t bg-gray-50 py-6 text-center text-sm text-gray-500">
    © 2024 Tick-it. All rights reserved.
  </footer>
);
