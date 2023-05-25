import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
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
        <title>Mail System</title>
        
        <link rel="stylesheet" href="https://bootswatch.com/5/zephyr/bootstrap.min.css" />
      </head>
      <body className={inter.className}>
        <header>
          <Navigation />
        </header>
        <div className="container p-4">
          <DependenciesProvider>
            {children}  
          </DependenciesProvider>
          
          </div>
      </body>
    </html>
  );
}
