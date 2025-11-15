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

  const refreshUser = async () => {
    // Récupérer le username depuis le cookie
    const username = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username="))
      ?.split("=")[1]
      ?.trim();

    if (username) {
      try {
        const decodedUsername = decodeURIComponent(username);
        const response = await fetch(`/api/users/${encodeURIComponent(decodedUsername)}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Failed to fetch user:", response.status, await response.text());
        }
      } catch (error) {
        console.error("Error fetching user:", error);
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

