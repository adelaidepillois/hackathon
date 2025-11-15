"use client";

import { useUser } from "@/contexts/UserContext";
import UserBadge from "./UserBadge";
import ScoreBadge from "./ScoreBadge";
import { useEffect } from "react";

export default function UserSession() {
  const { user, refreshUser } = useUser();

  // Vérifier périodiquement si le cookie existe mais que l'utilisateur n'est pas chargé
  useEffect(() => {
    const checkCookie = () => {
      const username = document.cookie
        .split("; ")
        .find((row) => row.startsWith("username="))
        ?.split("=")[1];
      
      if (username && !user) {
        refreshUser();
      }
    };

    // Vérifier immédiatement
    checkCookie();
    
    // Vérifier périodiquement (toutes les secondes pendant 5 secondes)
    const interval = setInterval(checkCookie, 1000);
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [user, refreshUser]);

  if (!user) {
    return null;
  }

  return (
    <>
      <UserBadge label={user.username} position="left" />
      <ScoreBadge score={user.score ?? null} />
    </>
  );
}

