import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Script from "next/script";
import { Toaster } from "./Toaster";

//import Head from "next/head";

import { AdministrationProvider } from "@/context/AdministrationContext";
import { DependenciesProvider } from "@/context/DependenciesContext";
import { RequestsProvider } from "@/context/RequestsContext";
import { MailTypeProvider } from "@/context/MailTypeContext";
import { MailProvider } from "@/context/MailsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mail System",
  description: "Sistema de Control de Correo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://bootswatch.com/5/zephyr/bootstrap.min.css"
        />
      </head>
      <body className={inter.className}>
        <main>
          <header>
            <Navigation />
          </header>
          <div className="container p-4">
            <AdministrationProvider>
              <MailProvider>
                <MailTypeProvider>
                  <DependenciesProvider>
                    <RequestsProvider>{children}</RequestsProvider>
                  </DependenciesProvider>
                </MailTypeProvider>
              </MailProvider>
            </AdministrationProvider>
          </div>
        </main>

        <Script
          rel="preload"
          as="script"
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
          integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
          strategy="afterInteractive"
          crossorigin="anonymous"
        />
      </body>
    </html>
  );
}
