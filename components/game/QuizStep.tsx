"use client";

import { useState, useEffect } from "react";
import { QuizQuestion } from "@/data/quizzes";
import { styles } from "@/styles";

interface QuizStepProps {
  stepTitle: string;
  questions: QuizQuestion[];
  onComplete: (correctAnswers: number) => void; // Nombre de bonnes réponses
  levelTitle?: string; // Nom du niveau
  codex?: string[]; // Données du codex pour le niveau
}

export default function QuizStep({ stepTitle, questions, onComplete, levelTitle, codex }: QuizStepProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showCodex, setShowCodex] = useState(false);

  // Réinitialiser l'état quand les questions changent
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setFinalScore(0);
    setShowExplanation(false);
    setIsAnswerCorrect(false);
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
    setIsAnswerCorrect(isCorrect);

    // Afficher l'explication si elle existe, sinon passer directement à la suite
    if (currentQuestion.explanation) {
      setShowExplanation(true);
    } else {
      // Pas d'explication, passer directement à la suite
      proceedToNext(isCorrect);
    }
  };

  const proceedToNext = (isCorrect: boolean) => {
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
      setShowExplanation(false);
    }
  };

  const handleContinueAfterExplanation = () => {
    proceedToNext(isAnswerCorrect);
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
          className={`${styles.buttonText} text-white group flex items-center justify-between fixed bottom-4 left-1/2 -translate-x-1/2 md:bottom-8 px-6 py-1 mb-[1rem] md:mb-0 rounded-full bg-[#2162DD] border-[#2162DD] border hover:bg-transparent hover:text-[#2162DD] transition-all duration-500 z-50 min-w-[250px] md:min-w-[250px]`}
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

  // Afficher l'explication si elle existe
  if (showExplanation && currentQuestion.explanation) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] pb-24">
        <div className="flex flex-col w-full justify-between px-5 py-4 border-white border rounded-[10px] bg-[hsl(219,73%,50%,0.3)] backdrop-blur-md text-white transition-all duration-300">
          <div className="mb-4">
            <h4 className={`${styles.levelCardTitle} text-2xl mb-2`}>
              {isAnswerCorrect ? "Bonne reponse" : "Mauvaise reponse"}
            </h4>
            <p className={`${styles.levelCardDescription} text-white`}>
              {currentQuestion.explanation}
            </p>
          </div>
        </div>
        <button
          onClick={handleContinueAfterExplanation}
          className={`${styles.buttonText} text-white fixed bottom-4 left-1/2 -translate-x-1/2 md:bottom-8 px-8 py-1 mb-[1rem] md:mb-0 rounded-full bg-[#2162DD] border-[#2162DD] border hover:bg-transparent hover:text-[#2162DD] transition-all duration-500 z-50`}
        >
          {isLastQuestion ? "Terminer" : "Suivant"}
        </button>
      </div>
    );
  }

  const questionType = currentQuestion.type || "text";
  const isImageQuestion = questionType === "image";

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-24">
      {/* <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center">
        {stepTitle} - Question {currentQuestionIndex + 1} / {questions.length}
      </h3> */}

      {levelTitle && (
        <h4 className={`${styles.titleLevel} text-white mb-6 fixed top-8 left-1/2 -translate-x-1/2 z-40`}>
          {levelTitle}
        </h4>
      )}

      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <p className={`${styles.paragraphLarge} text-center mb-4 text-white max-w-[87%] md:max-w-[50%]`}>
          {currentQuestion.question}
        </p>
        {isImageQuestion && currentQuestion.imageUrl && (
          <div className="mb-4 w-[87%] md:max-w-[50%] flex justify-center px-5 py-4 border-white border rounded-[10px] bg-[hsl(219,73%,50%,0.3)] backdrop-blur-md text-white transition-all duration-300">
            <img
              src={currentQuestion.imageUrl}
              alt="Question image"
              className=" h-auto rounded-lg object-cover max-h-[400px]"
            />
          </div>
        )}



        {isImageQuestion ? (
          // Boutons Vrai/Faux pour les questions avec image
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleAnswerSelect(0)}
              className={`${styles.buttonText} text-white flex-1 px-6 py-1 rounded-full border transition-all duration-500 ${selectedAnswer === 0
                  ? "bg-[#2162DD] border-[#2162DD] text-[#2162DD]"
                  : "bg-transparent border-[#2162DD] text-[#2162DD] hover:bg-[#2162DD] hover:text-white"
                }`}
            >
              Vrai
            </button>
            <button
              onClick={() => handleAnswerSelect(1)}
              className={`${styles.buttonText} text-white flex-1 px-6 py-1 rounded-full border transition-all duration-500 ${selectedAnswer === 1
                  ? "bg-[#2162DD] border-[#2162DD] text-white"
                  : "bg-transparent border-[#2162DD] text-[#2162DD] hover:bg-[#2162DD] hover:text-white"
                }`}
            >
              Faux
            </button>
          </div>
        ) : (
          // Options multiples pour les questions texte
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left px-4 py-1 rounded-full border-2 transition-all ${selectedAnswer === index
                    ? "bg-[#2162DD] border-[#2162DD] text-white"
                    : "bg-white/5 border-white/30 text-white hover:bg-white/10"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={selectedAnswer === null}
        className={`${styles.buttonText} text-white fixed bottom-4 left-1/2 -translate-x-1/2 md:bottom-8 px-8 py-1 mb-[1rem] md:mb-0 rounded-full bg-[#2162DD] border-[#2162DD] border z-50 ${selectedAnswer === null
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-transparent hover:text-[#2162DD] transition-all duration-500"
          }`}
      >
        {isLastQuestion ? "Terminer" : "Suivant"}
      </button>

      {/* Bouton Codex en bas à gauche */}
      {codex && codex.length > 0 && (
        <>
          <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50">
            <button
              onClick={() => setShowCodex(!showCodex)}
              className="p-3 rounded-full bg-transparent transition-all duration-500 flex items-center justify-center"
            >
              <img 
                src="/images/codex.svg" 
                alt="Codex" 
                className="w-[60px] h-[60px]"
              />
            </button>

            {/* Popup Codex juste au-dessus du bouton */}
            {showCodex && (
              <div className="fixed bottom-20 left-4 right-4 md:absolute md:bottom-full md:left-0 md:right-auto md:w-[400px] mb-4 md:mb-0 mx-4 md:mx-0">
                <div className="bg-[#FF5CE8] rounded-lg p-6 relative">
                  <button
                    onClick={() => setShowCodex(false)}
                    className="absolute top-[-10px] right-4 text-white text-[50px] font-light hover:opacity-70"
                  >
                    ×
                  </button>
                  <h3 className={`${styles.usernameLabel} mb-4 text-white`}>Biais introduits :</h3>
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
          </div>
        </>
      )}
    </div>
  );
}

