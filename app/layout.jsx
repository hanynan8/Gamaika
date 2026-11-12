import './globals.css';
import Navbar from './components/navbar';
import { Aref_Ruqaa, Cairo, Amiri } from 'next/font/google';
import Footer from './components/footer';

const amiri = Amiri({ subsets: ['arabic'], weight: ['400', '700'] });
const arefRuqaa = Aref_Ruqaa({
  subsets: ['arabic'],
  weight: '400',
  variable: '--font-ruqaa',
});

export const metadata = {
  title: 'My App',
  description: 'My Next.js app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Navbar />
        {children}
        <div id="footer">
          <Footer />
        </div>
      </body>
    </html>
  );
}