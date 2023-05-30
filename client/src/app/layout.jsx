import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import Script from "next/script";
import { Toaster } from "./Toaster";

//import Head from "next/head";
import { DependenciesProvider } from "@/context/DependenciesContext";

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
          href="https://bootswatch.com/5/zephyr/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://bootswatch.com/5/zephyr/bootstrap.css"
        />
        <link
          rel="stylesheet"
          href="https://bootswatch.com/5/zephyr/_variables.scss"
        />
        <link
          rel="stylesheet"
          href="https://bootswatch.com/5/zephyr/_bootswatch.scss"
        />
      </head>
      <body className={inter.className}>
        <header>
          <Navigation />
        </header>
        <div className="container p-4">
          <DependenciesProvider>
            {children}
            <Toaster />
          </DependenciesProvider>
        </div>
        <Script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
          integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
          crossorigin="anonymous"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
          integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
          crossorigin="anonymous"
        />
        <Script
          src="https://code.jquery.com/jquery-3.7.0.js"
          integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM="
          crossorigin="anonymous"
        />
      </body>
    </html>
  );
}
