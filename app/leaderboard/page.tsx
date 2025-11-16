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
      
      <div className="w-full mx-auto flex flex-col items-center justify-center min-h-screen py-4 md:py-8 px-4 pb-20 md:pb-8">
        <h1 className="text-white font-moore text-[40px] md:text-[150px] text-center mb-4 md:mb-12 leading-tight">Podium</h1>
        
        {isLoading ? (
          <p className="text-white text-sm md:text-xl">Chargement...</p>
        ) : leaderboard.length === 0 ? (
          <p className="text-white text-sm md:text-xl">Aucun score disponible</p>
        ) : (
          <div className="flex flex-row items-end justify-center gap-4 md:gap-8 w-full max-w-4xl px-2">
            {/* 2ème place */}
            {leaderboard.length >= 2 && (
              <div className="flex flex-col items-center w-full md:w-auto">
                <div className="bg-[hsl(219,73%,50%,0.3)] backdrop-blur-md border-white border rounded-lg p-2 md:p-6 w-full min-w-[120px] sm:min-w-[200px] md:min-w-[350px] mb-2 md:mb-4">
                  <div className="text-center">
                    <h3 className="text-white font-moore text-[50px] md:text-[80px] mb-1 md:mb-2 leading-[70px]">2</h3>
                    <p className="text-white font-neue uppercase font-bold text-[18px] md:text-[30px] mb-1 md:mb-2 truncate">
                      {leaderboard[1].username}
                    </p>
                    <p className="text-white font-neue font-normal italic text-xs md:text-2xl">
                      {leaderboard[1].score} pts
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 1ère place */}
            {leaderboard.length >= 1 && (
              <div className="flex flex-col items-center w-full md:w-auto">
                <div className="bg-[hsl(219,73%,50%,0.3)] backdrop-blur-md border-white border rounded-lg p-2 md:p-6 w-full min-w-[120px] sm:min-w-[200px] md:min-w-[350px] mb-2 md:mb-4 transform scale-105 md:scale-110">
                  <div className="text-center">
                    <h3 className="text-white font-moore text-[60px] md:text-[80px] mb-1 md:mb-2 leading-[70px]">1</h3>
                    <p className="text-white font-neue uppercase font-bold text-[18px] md:text-[30px] mb-1 md:mb-2 truncate">
                      {leaderboard[0].username}
                    </p>
                    <p className="text-white font-neue font-normal italic text-sm md:text-3xl">
                      {leaderboard[0].score} pts
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3ème place */}
            {leaderboard.length >= 3 && (
              <div className="flex flex-col items-center w-full md:w-auto">
                <div className="bg-[hsl(219,73%,50%,0.3)] backdrop-blur-md border-white border rounded-lg p-2 md:p-6 w-full min-w-[120px] sm:min-w-[200px] md:min-w-[350px] mb-2 md:mb-4">
                  <div className="text-center">
                    <h3 className="text-white font-moore text-[40px] md:text-[80px] mb-1 md:mb-2 leading-[70px]">3</h3>
                    <p className="text-white font-neue uppercase font-bold text-[18px] md:text-[30px] mb-1 md:mb-2 truncate">
                      {leaderboard[2].username}
                    </p>
                    <p className="text-white font-neue font-normal italic text-xs md:text-2xl">
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
          className={`${styles.buttonText} text-white fixed left-1/2 -translate-x-1/2 bottom-8 px-6 md:px-8 py-2 rounded-full bg-[#2162DD] border-[#2162DD] border hover:bg-transparent hover:text-[#2162DD] transition-all duration-500 z-50 text-sm md:text-base`}
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}

