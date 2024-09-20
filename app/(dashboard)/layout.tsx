import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function DasboardLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
