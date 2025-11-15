"use client";

import { useState, useEffect } from "react";
import { QuizQuestion } from "@/data/quizzes";
import { styles } from "@/styles";

interface QuizStepProps {
  stepTitle: string;
  questions: QuizQuestion[];
  onComplete: (correctAnswers: number) => void; // Nombre de bonnes réponses
}

export default function QuizStep({ stepTitle, questions, onComplete }: QuizStepProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Réinitialiser l'état quand les questions changent
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setFinalScore(0);
  }, [stepTitle, questions]);

  // Vérifier si le tableau de questions est vide
  if (!questions || questions.length === 0) {
    return (
      <div className="text-center">
        <p className="text-white text-xl">Aucune question disponible pour cette étape.</p>
        <p className="text-white text-sm mt-2">Questions: {JSON.stringify(questions)}</p>
      </div>
    );
  }

  // Vérifier que l'index est valide
  if (currentQuestionIndex < 0 || currentQuestionIndex >= questions.length) {
    return (
      <div className="text-center">
        <p className="text-white text-xl">Erreur : index de question invalide.</p>
        <p className="text-white text-sm mt-2">
          Index: {currentQuestionIndex}, Total: {questions.length}
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Vérifier si currentQuestion existe
  if (!currentQuestion) {
    return (
      <div className="text-center">
        <p className="text-white text-xl">Erreur : question introuvable.</p>
        <p className="text-white text-sm mt-2">
          Index: {currentQuestionIndex}, Questions: {questions.length}
        </p>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    // Vérifier si la réponse est correcte
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;

    if (isLastQuestion) {
      // Dernière question, afficher le résultat
      setFinalScore(newScore);
      setShowResult(true);
    } else {
      // Passer à la question suivante
      setScore(newScore);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handleContinue = () => {
    onComplete(finalScore);
  };

  if (showResult) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 text-center">
        <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">Résultat de {stepTitle}</h3>
        <p className="text-white text-2xl mb-6">
          Score: {finalScore} / {questions.length}
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className={`${styles.buttonText} px-8 py-3 rounded-full bg-[#2162DD] border-[#2162DD] border hover:bg-transparent hover:text-[#2162DD] transition-all duration-500`}
          >
            Étape suivante →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center">
        {stepTitle} - Question {currentQuestionIndex + 1} / {questions.length}
      </h3>
      
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 md:p-8 mb-6">
        <h4 className={`${styles.paragraphLarge} mb-6 text-white`}>
          {currentQuestion.question}
        </h4>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                selectedAnswer === index
                  ? "bg-[#2162DD] border-[#2162DD] text-white"
                  : "bg-white/5 border-white/30 text-white hover:bg-white/10"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className={`${styles.buttonText} px-8 py-3 rounded-full bg-[#2162DD] border-[#2162DD] border ${
            selectedAnswer === null
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-transparent hover:text-[#2162DD] transition-all duration-500"
          }`}
        >
          {isLastQuestion ? "Terminer" : "Suivant"}
        </button>
      </div>
    </div>
  );
}

