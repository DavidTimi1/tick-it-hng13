import React from 'react';
import { useToast } from './store';
import type { Status, Priority } from './store';

export const Toast = () => {
  const { message, variant, hide } = useToast();
  if (!message) return null;
  const bg = variant === 'success' ? 'bg-green-500' : 'bg-red-500';
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`flex items-center p-3 text-white rounded-xl shadow-lg ${bg}`}>
        <span>{message}</span>
        <button onClick={hide} className="ml-3">✖</button>
      </div>
    </div>
  );
};

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
  }
> = ({ variant = 'default', size = 'default', className = '', ...props }) => {
  const base = 'rounded-lg font-medium focus:ring-2 disabled:opacity-50';
  const variants = {
    default: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border border-gray-300 bg-white hover:bg-gray-100 text-gray-700',
    ghost: 'hover:bg-gray-100 text-gray-700',
  };
  const sizes = { sm: 'h-8 px-3', lg: 'h-12 px-8 text-lg', default: 'h-10 px-4' };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
};

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition ${className}`}>{children}</div>
);

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`border rounded-lg p-2 w-full ${props.className || ''}`} />
);

export const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className={`border rounded-lg p-2 w-full ${props.className || ''}`} />
);

export const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className={`border rounded-lg p-2 w-full ${props.className || ''}`} />
);

export const Badge: React.FC<{ status: Status | Priority }> = ({ status }) => {
  const map: Record<string, string> = {
    open: 'bg-green-100 text-green-600',
    in_progress: 'bg-yellow-100 text-yellow-600',
    closed: 'bg-gray-100 text-gray-600',
    Low: 'bg-gray-100 text-gray-600',
    Medium: 'bg-amber-100 text-amber-600',
    High: 'bg-red-100 text-red-600',
  };
  return <span className={`px-2 py-0.5 rounded-full text-xs ${map[status]}`}>{status}</span>;
};
