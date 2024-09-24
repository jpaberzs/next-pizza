import { Metadata } from 'next';
import { Header } from '@/shared/components/shared/header';
import React, { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'React Pizza',
};

export default function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <main>
      <Suspense>
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
