"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageTitle from "./PageTitle";
import CTAButton from "./CTAButton";
import QuizStep from "./QuizStep";
import { getQuizzesForLevel } from "@/data/quizzes";
import { GameStep } from "@/data/quizzes";
import { useUser } from "@/contexts/UserContext";
import { styles } from "@/styles";

interface GameContentProps {
  title: string;
  subtitle: string;
  levelId: number;
  codex?: string[];
}

export default function GameContent({ title, subtitle, levelId, codex }: GameContentProps) {
  const router = useRouter();
  const { refreshUser, user } = useUser();
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [levelUpdated, setLevelUpdated] = useState(false);
  const [levelPassed, setLevelPassed] = useState(false);
  const [initialScore, setInitialScore] = useState(0);
  
  const steps = getQuizzesForLevel(levelId);

  // Récupérer le score initial au chargement du composant et avant de commencer le niveau
  useEffect(() => {
    if (user?.score !== undefined) {
      setInitialScore(user.score);
    }
  }, [user]);

  const handleStartGame = async () => {
    // Récupérer le score initial directement depuis l'API avant de commencer le niveau
    try {
      const cookieStore = document.cookie
        .split("; ")
        .find((row) => row.startsWith("username="))
        ?.split("=")[1];
      
      if (cookieStore) {
        const decodedUsername = decodeURIComponent(cookieStore.trim());
        const response = await fetch(`/api/users/${encodeURIComponent(decodedUsername)}`);
        if (response.ok) {
          const userData = await response.json();
          setInitialScore(userData.score || 0);
        }
      }
    } catch (error) {
      console.error("Error fetching initial score:", error);
    }
    
    setGameStarted(true);
  };

  const handleStepComplete = (correctAnswers: number) => {
    setTotalCorrectAnswers(prev => prev + correctAnswers);
    
    // Passer à l'étape suivante immédiatement
    setCurrentStepIndex(prev => {
      if (prev < steps.length - 1) {
        return prev + 1;
      }
      // Toutes les étapes sont terminées
      return prev + 1; // Incrémenter pour déclencher l'écran de fin
    });
  };

  // Calculer les points totaux et sauvegarder quand toutes les étapes sont terminées
  useEffect(() => {
    if (currentStepIndex >= steps.length && !scoreSaved && totalCorrectAnswers > 0) {
      const saveScore = async () => {
        // Calculer le nombre total de questions et le maximum de points possibles
        const totalQuestions = steps.reduce((acc, step) => acc + step.quiz.length, 0);
        const maxPoints = totalQuestions * 10;
        const passingThreshold = maxPoints * 0.7; // 70% du maximum
        
        const newPoints = totalCorrectAnswers * 10;
        // La validation se base uniquement sur les points obtenus DANS CE NIVEAU
        const hasPassed = newPoints >= passingThreshold;
        
        setPointsEarned(newPoints);
        setLevelPassed(hasPassed);
        setScoreSaved(true);

        try {
          // Toujours sauvegarder les points obtenus pendant le niveau
          const scoreResponse = await fetch("/api/users/score", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ points: newPoints }),
          });

          if (!scoreResponse.ok) {
            console.error("Failed to save score");
            setScoreSaved(false);
            return;
          }

          // Débloquer le niveau suivant seulement si le niveau est validé (70%)
          if (hasPassed) {
            const nextLevel = levelId + 1;
            const levelResponse = await fetch("/api/users/level", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ level: nextLevel }),
            });

            if (levelResponse.ok) {
              setLevelUpdated(true);
            }
          }

          // Rafraîchir les données utilisateur
          await refreshUser();
        } catch (error) {
          console.error("Error saving score:", error);
          setScoreSaved(false);
        }
      };

      saveScore();
    }
  }, [currentStepIndex, steps, scoreSaved, totalCorrectAnswers, refreshUser, levelId, initialScore]);

  if (!gameStarted) {
    // État "préparation" (écran initial)
    return (
      <div className="relative min-h-screen flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-4xl flex flex-col items-center px-[1rem] md:px-0 pt-[60px] md:pt-0">
          <PageTitle title={title} subtitle={''} />
          <p className={`${styles.paragraphSmall} text-center mx-auto px-2 pb-4 md:pb-8`}>{subtitle}</p>
          {codex && codex.length > 0 && (
            <div className="w-full max-w-2xl">
              <div className="flex flex-col w-full justify-between px-5 py-4 border-white border rounded-[10px] bg-[hsl(219,73%,50%,0.3)] backdrop-blur-md text-white transition-all duration-300">
                <p className={`${styles.usernameLabel} mb-2`}>Biais introduits :</p>
                <ul className="space-y-2">
                  {codex.map((item, index) => (
                    <li
                      key={index}
                      className={`${styles.levelCardDescription} text-white`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <CTAButton text="Lancer le niveau" onClick={handleStartGame} />
        </div>
      </div>
    );
  }

  // Vérifier si toutes les étapes sont terminées
  if (currentStepIndex >= steps.length) {
    const newPoints = totalCorrectAnswers * 10;
    const totalQuestions = steps.reduce((acc, step) => acc + step.quiz.length, 0);
    const maxPoints = totalQuestions * 10;
    const passingThreshold = maxPoints * 0.7;
    // La validation se base uniquement sur les points obtenus DANS CE NIVEAU
    const hasPassed = levelPassed || ((pointsEarned || newPoints) >= passingThreshold);
    const pointsNeeded = Math.max(0, Math.ceil(passingThreshold) - (pointsEarned || newPoints));

    const handleBackToLevels = () => {
      router.push("/levels");
    };

    return (
      <>
        {/* Background spécifique pour l'écran de fin */}
        <div className="fixed inset-[1rem] rounded-2xl overflow-hidden -z-10">
          <img
            src="/images/backFinish.svg"
            alt="Background Finish"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="text-center px-4 mx-auto">
            <h2 className={`${styles.titleSecondFinish} `}>
              {`Niveau ${levelId}`}
            </h2>
            <h3 className={`${styles.titleFinish}`}>
              termine
            </h3>
            {!hasPassed && (
              <div className="mt-8 flex flex-col items-center justify-center">
                <p className="text-white text-xl font-bold mb-2">
                  Niveau non validé. Il vous reste {pointsNeeded} pts à obtenir pour débloquer le niveau suivant.
                </p>
                <p className={`${styles.levelCardDescription} text-white max-w-[50%]`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.</p>
              </div>
            )}
            {hasPassed && (
              <div className="mt-8 flex flex-col items-center justify-center">
                <p className="text-white text-xl font-bold mb-2">
                  Niveau suivant débloqué.
                </p>
                <p className={`${styles.levelCardDescription} text-white max-w-[50%]`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.</p>
              </div>
            )}
            <CTAButton 
              text="Retour aux niveaux" 
              onClick={handleBackToLevels}
            />
          </div>
        </div>
      </>
    );
  }

  // Vérifier si steps est vide ou si l'index est invalide
  if (!steps || steps.length === 0) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-4">Aucun quiz disponible</h2>
          <p className="text-white text-xl md:text-2xl">{title}</p>
        </div>
      </div>
    );
  }

  // État "jeu en cours" - afficher l'étape actuelle avec son quiz
  const currentStep = steps[currentStepIndex];
  
  // Vérifier si currentStep existe
  if (!currentStep) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-4">Étape introuvable</h2>
          <p className="text-white text-xl md:text-2xl">Index: {currentStepIndex}, Total: {steps.length}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative min-h-screen flex items-center justify-center py-8">
      <QuizStep
        stepTitle={currentStep.title}
        questions={currentStep.quiz || []}
        onComplete={handleStepComplete}
        levelTitle={title}
        codex={codex}
      />
    </div>
  );
}

