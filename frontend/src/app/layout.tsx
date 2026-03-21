import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer, Bounce } from 'react-toastify';


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Cursos Web",
  description: "Aplicación para subir mis cursos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
    </body>
  );
}
