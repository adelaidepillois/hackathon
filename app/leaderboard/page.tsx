"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { styles } from "@/styles";

interface LeaderboardEntry {
  username: string;
  score: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/users/leaderboard");
        if (response.ok) {
          const data = await response.json();
          setLeaderboard(data.leaderboard || []);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <main className="relative w-full min-h-screen">
      <div className="fixed inset-[1rem] rounded-2xl overflow-hidden -z-10">
        <img
          src="/images/background.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="w-full mx-auto flex flex-col items-center justify-center min-h-screen py-8 px-4">
        <h1 className={`${styles.headingH1} text-center mb-12`}>Podium</h1>
        
        {isLoading ? (
          <p className="text-white text-xl">Chargement...</p>
        ) : leaderboard.length === 0 ? (
          <p className="text-white text-xl">Aucun score disponible</p>
        ) : (
          <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 w-full max-w-4xl">
            {/* 2ème place */}
            {leaderboard.length >= 2 && (
              <div className="flex flex-col items-center order-2 md:order-1">
                <div className="bg-[hsl(219,73%,50%,0.3)] backdrop-blur-md border-white border rounded-lg p-6 w-full max-w-[200px] mb-4">
                  <div className="text-center">
                    <h3 className={`${styles.levelCardTitle} text-white text-4xl mb-2`}>2</h3>
                    <p className={`${styles.textBadge} text-white text-xl mb-2`}>
                      {leaderboard[1].username}
                    </p>
                    <p className={`${styles.textBadge} text-white text-2xl`}>
                      {leaderboard[1].score} pts
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 1ère place */}
            {leaderboard.length >= 1 && (
              <div className="flex flex-col items-center order-1 md:order-2">
                <div className="bg-[hsl(219,73%,50%,0.3)] backdrop-blur-md border-white border rounded-lg p-8 w-full max-w-[250px] mb-4 transform scale-110">
                  <div className="text-center">
                    <h3 className={`${styles.levelCardTitle} text-white text-5xl mb-2`}>1</h3>
                    <p className={`${styles.textBadge} text-white text-xl mb-2`}>
                      {leaderboard[0].username}
                    </p>
                    <p className={`${styles.textBadge} text-white text-3xl`}>
                      {leaderboard[0].score} pts
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3ème place */}
            {leaderboard.length >= 3 && (
              <div className="flex flex-col items-center order-3">
                <div className="bg-[hsl(219,73%,50%,0.3)] backdrop-blur-md border-white border rounded-lg p-6 w-full max-w-[200px] mb-4">
                  <div className="text-center">
                    <h3 className={`${styles.levelCardTitle} text-white text-4xl mb-2`}>3</h3>
                    <p className={`${styles.textBadge} text-white text-xl mb-2`}>
                      {leaderboard[2].username}
                    </p>
                    <p className={`${styles.textBadge} text-white text-2xl`}>
                      {leaderboard[2].score} pts
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <Link 
          href="/"
          className={`${styles.buttonText} fixed bottom-4 left-1/2 -translate-x-1/2 md:bottom-8 px-8 py-1 rounded-full bg-[#2162DD] border-[#2162DD] border hover:bg-transparent hover:text-[#2162DD] transition-all duration-500 z-50`}
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}

