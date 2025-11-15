"use client";

import { useUser } from "@/contexts/UserContext";
import UserBadge from "./UserBadge";
import ScoreBadge from "./ScoreBadge";
import { useEffect, useState } from "react";

export default function UserSession() {
  const { user, refreshUser } = useUser();
  const [hasChecked, setHasChecked] = useState(false);

  // Vérifier une seule fois si le cookie existe mais que l'utilisateur n'est pas chargé
  useEffect(() => {
    // Ne vérifier qu'une seule fois au montage du composant
    if (hasChecked) return;

    const username = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username="))
      ?.split("=")[1];
    
    if (username && !user) {
      refreshUser();
    }
    
    setHasChecked(true);
  }, [user, refreshUser, hasChecked]);

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

