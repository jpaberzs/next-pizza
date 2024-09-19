import { Nunito } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './global.css';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={nunito.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
