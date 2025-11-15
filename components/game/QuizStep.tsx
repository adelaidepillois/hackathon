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
      <div className="w-full max-w-2xl mx-auto px-4 text-center pb-24">
        <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">Résultat de {stepTitle}</h3>
        <p className="text-white text-2xl mb-6">
          Score: {finalScore} / {questions.length}
        </p>
        <button
          onClick={handleContinue}
          className={`${styles.buttonText} group flex items-center justify-between fixed bottom-4 left-1/2 -translate-x-1/2 md:bottom-8 px-6 py-1 mb-[1rem] md:mb-0 rounded-full bg-[#2162DD] border-[#2162DD] border hover:bg-transparent hover:text-[#2162DD] transition-all duration-500 z-50 min-w-[250px] md:min-w-[250px]`}
        >
          <span>Étape suivante</span>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 47 44" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path 
              d="M0 19.547V24.3206C0 25.4251 0.895431 26.3206 2 26.3206H26.0695C27.1741 26.3206 28.0695 27.216 28.0695 28.3206V33.0941C28.0695 34.1987 27.1741 35.0941 26.0695 35.0941H21.3266C20.222 35.0941 19.3266 35.9895 19.3266 37.0941V41.8676C19.3266 42.9722 20.222 43.8676 21.3266 43.8676H26.9898C28.0944 43.8676 28.9898 42.9722 28.9898 41.8676V37.0941C28.9898 35.9895 29.8853 35.0941 30.9898 35.0941H35.7328C36.8374 35.0941 37.7328 34.1987 37.7328 33.0941V28.7592C37.7328 27.6547 38.6282 26.7592 39.7328 26.7592H44.9359C46.0405 26.7592 46.9359 25.8638 46.9359 24.7592V19.1084C46.9359 18.0038 46.0405 17.1084 44.9359 17.1084H39.7328C38.6282 17.1084 37.7328 16.2129 37.7328 15.1084V10.3348C37.7328 9.23028 36.8374 8.33484 35.7328 8.33484H30.5297C29.4251 8.33484 28.5297 7.43941 28.5297 6.33484V2C28.5297 0.895431 27.6342 0 26.5297 0H21.3266C20.222 0 19.3266 0.895432 19.3266 2V7.2122C19.3266 8.31677 20.222 9.2122 21.3266 9.2122H26.5297C27.6342 9.2122 28.5297 10.1076 28.5297 11.2122V15.547C28.5297 16.6516 27.6342 17.547 26.5297 17.547H2C0.895431 17.547 0 18.4425 0 19.547Z" 
              fill="white" 
              className="transition-all duration-500 group-hover:fill-[#2162DD]" 
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-24">
      <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center">
        {stepTitle} - Question {currentQuestionIndex + 1} / {questions.length}
      </h3>
      
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 md:p-8 mb-6 mx-[1rem] md:mx-0">
        <h4 className={`${styles.paragraphLarge} mb-6 text-white`}>
          {currentQuestion.question}
        </h4>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left px-4 py-1 rounded-lg border-2 transition-all ${
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

      <button
        onClick={handleNext}
        disabled={selectedAnswer === null}
        className={`${styles.buttonText} fixed bottom-4 left-1/2 -translate-x-1/2 md:bottom-8 px-8 py-1 mb-[1rem] md:mb-0 rounded-full bg-[#2162DD] border-[#2162DD] border z-50 ${
          selectedAnswer === null
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-transparent hover:text-[#2162DD] transition-all duration-500"
        }`}
      >
        {isLastQuestion ? "Terminer" : "Suivant"}
      </button>
    </div>
  );
}

