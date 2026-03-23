import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/NavBar";
import Providers from "../components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cursos Web",
  description: "Aplicación para subir mis cursos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="mt-10 px-6 max-w-7xl mx-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}