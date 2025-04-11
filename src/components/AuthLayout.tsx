import React from 'react';
import Logo from '@/src/assets/logo.svg?react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2F52E0] via-[#000000] to-[#000000]">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link to="https://www.mindwellworld.com">
              <Logo className="h-8 w-auto text-[#16F4D0]" />
            </Link>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
            {title}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-transparent px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
