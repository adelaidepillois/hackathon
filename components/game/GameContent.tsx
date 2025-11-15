"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageTitle from "./PageTitle";
import CTAButton from "./CTAButton";
import QuizStep from "./QuizStep";
import { getQuizzesForLevel } from "@/data/quizzes";
import { GameStep } from "@/data/quizzes";
import { useUser } from "@/contexts/UserContext";

interface GameContentProps {
  title: string;
  subtitle: string;
  levelId: number;
}

export default function GameContent({ title, subtitle, levelId }: GameContentProps) {
  const router = useRouter();
  const { refreshUser } = useUser();
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [levelUpdated, setLevelUpdated] = useState(false);
  
  const steps = getQuizzesForLevel(levelId);

  const handleStartGame = () => {
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
        const totalPoints = totalCorrectAnswers * 10;
        setPointsEarned(totalPoints);
        setScoreSaved(true);

        try {
          // Sauvegarder le score
          const scoreResponse = await fetch("/api/users/score", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ points: totalPoints }),
          });

          if (!scoreResponse.ok) {
            console.error("Failed to save score");
            setScoreSaved(false);
            return;
          }

          // Débloquer le niveau suivant
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

          // Rafraîchir les données utilisateur
          await refreshUser();
        } catch (error) {
          console.error("Error saving score:", error);
          setScoreSaved(false);
        }
      };

      saveScore();
    }
  }, [currentStepIndex, steps.length, scoreSaved, totalCorrectAnswers, refreshUser, levelId]);

  if (!gameStarted) {
    // État "préparation" (écran initial)
    return (
      <>
        <PageTitle title={title} subtitle={subtitle} />
        <CTAButton text="Lancer le niveau" onClick={handleStartGame} />
      </>
    );
  }

  // Vérifier si toutes les étapes sont terminées
  if (currentStepIndex >= steps.length) {
    const totalPoints = totalCorrectAnswers * 10;
    const totalQuestions = steps.reduce((acc, step) => acc + step.quiz.length, 0);
    const nextLevel = levelId + 1;

    const handleBackToLevels = () => {
      router.push("/levels");
    };

    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-4">Niveau terminé</h2>
          <p className="text-white text-lg mb-2">
            Bonnes réponses: {totalCorrectAnswers} / {totalQuestions}
          </p>
          <p className="text-white text-2xl font-bold mb-4">
            Points gagnés: {pointsEarned || totalPoints} pts
          </p>
          <CTAButton 
            text="Retour aux niveaux" 
            onClick={handleBackToLevels}
          />
        </div>
      </div>
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
      />
    </div>
  );
}

