"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface UserData {
  username: string;
  score: number;
  level?: number;
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshUser = async () => {
    // Éviter les appels multiples simultanés
    if (isLoading) return;

    // Récupérer le username depuis le cookie
    const username = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username="))
      ?.split("=")[1]
      ?.trim();

    if (username) {
      setIsLoading(true);
      try {
        const decodedUsername = decodeURIComponent(username);
        const response = await fetch(`/api/users/${encodeURIComponent(decodedUsername)}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else if (response.status === 404) {
          // Utilisateur non trouvé, réinitialiser et supprimer le cookie invalide
          setUser(null);
          // Supprimer le cookie invalide
          document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        // Pour les autres erreurs, on ne fait rien (pas d'erreur dans la console)
      } catch (error) {
        // Erreur réseau silencieuse
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Si pas de cookie, réinitialiser l'utilisateur
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

