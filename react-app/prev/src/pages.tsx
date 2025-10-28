import React, { useState } from 'react';
import { Button, Card, Input, Textarea, Select, Badge } from './components';
import { useStore, useToast, MOCK_USER, AUTH_PASSWORD } from './store';
import type { Page, Ticket, Priority, Status } from './store';

// --- LANDING PAGE ---
export const LandingPage: React.FC<{ navigate: (p: Page) => void }> = ({ navigate }) => (
  <div className="text-center py-20">
    <h1 className="text-5xl font-bold mb-6">Streamline Your Support</h1>
    <Button size="lg" onClick={() => navigate('/auth/signup')}>Get Started</Button>
  </div>
);

// --- AUTH PAGE ---
export const AuthPage: React.FC<{ type: 'login' | 'signup'; navigate: (p: Page) => void }> = ({ type, navigate }) => {
  const [email, setEmail] = useState(''); const [pass, setPass] = useState('');
  const show = useToast(s => s.show); const login = useStore(s => s.login);
  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'login' && email === MOCK_USER.email && pass === AUTH_PASSWORD) {
      login(MOCK_USER); show('Login successful', 'success'); navigate('/dashboard');
    } else if (type === 'signup') {
      login(MOCK_USER); show('Signup successful', 'success'); navigate('/dashboard');
    } else show('Invalid credentials', 'error');
  };
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="w-96">
        <h2 className="text-2xl mb-4 font-bold">{type === 'login' ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handle} className="space-y-4">
          <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={pass} onChange={e => setPass(e.target.value)} />
          <Button type="submit" className="w-full">{type === 'login' ? 'Login' : 'Signup'}</Button>
        </form>
      </Card>
    </div>
  );
};

// --- DASHBOARD ---
export const Dashboard: React.FC<{ navigate: (p: Page) => void }> = ({ navigate }) => {
  const tickets = useStore(s => s.tickets);
  const stats = [
    { title: 'Total', value: tickets.length },
    { title: 'Open', value: tickets.filter(t => t.status === 'open').length },
    { title: 'Closed', value: tickets.filter(t => t.status === 'closed').length },
  ];
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">{stats.map(s => <Card key={s.title}>{s.title}: {s.value}</Card>)}</div>
      <div className="text-center mt-10">
        <Button size="lg" onClick={() => navigate('/tickets')}>Manage Tickets</Button>
      </div>
    </div>
  );
};

// --- TICKET MANAGEMENT ---
export const TicketManagement: React.FC = () => {
  const { tickets, addTicket } = useStore();
  const show = useToast(s => s.show);
  const [title, setTitle] = useState('');
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addTicket({ title, description: '', priority: 'Low', status: 'open' });
    show('Ticket added', 'success'); setTitle('');
  };
  return (
    <div className="max-w-5xl mx-auto py-10">
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="New ticket title" />
        <Button type="submit">Add</Button>
      </form>
      {tickets.map(t => (
        <Card key={t.id}>
          <div className="flex justify-between">
            <div><strong>{t.title}</strong> <Badge status={t.status} /></div>
            <div className="text-sm text-gray-500">{t.lastUpdated}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};
