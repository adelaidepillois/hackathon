export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index de la bonne réponse
}

export interface GameStep {
  id: number;
  title: string;
  quiz: QuizQuestion[];
}

export interface LevelQuizzes {
  levelId: number;
  steps: GameStep[];
}

// Exemple de données pour le niveau 1
export const level1Quizzes: LevelQuizzes = {
  levelId: 1,
  steps: [
    {
      id: 1,
      title: "Étape 1",
      quiz: [
        {
          id: 1,
          question: "Quelle est la capitale de la France ?",
          options: ["Paris", "Lyon", "Marseille", "Toulouse"],
          correctAnswer: 0,
        },
        {
          id: 2,
          question: "Combien de continents y a-t-il sur Terre ?",
          options: ["5", "6", "7", "8"],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 2,
      title: "Étape 2",
      quiz: [
        {
          id: 3,
          question: "Quel est le plus grand océan ?",
          options: ["Atlantique", "Pacifique", "Indien", "Arctique"],
          correctAnswer: 1,
        },
      ],
    },
  ],
};

// Quiz pour le niveau 2
export const level2Quizzes: LevelQuizzes = {
  levelId: 2,
  steps: [
    {
      id: 1,
      title: "Étape 1",
      quiz: [
        {
          id: 1,
          question: "Quel est le plus grand pays du monde par superficie ?",
          options: ["Chine", "États-Unis", "Russie", "Canada"],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "Quelle est la plus haute montagne du monde ?",
          options: ["K2", "Mont Everest", "Kilimandjaro", "Mont Blanc"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "Quel est le plus long fleuve du monde ?",
          options: ["Nil", "Amazone", "Mississippi", "Yangtsé"],
          correctAnswer: 0,
        },
      ],
    },
    {
      id: 2,
      title: "Étape 2",
      quiz: [
        {
          id: 4,
          question: "Quelle est la plus grande île du monde ?",
          options: ["Madagascar", "Groenland", "Borneo", "Sumatra"],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "Quel désert est le plus grand du monde ?",
          options: ["Sahara", "Gobi", "Antarctique", "Arctique"],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: 3,
      title: "Étape 3",
      quiz: [
        {
          id: 6,
          question: "Quel est le plus grand lac du monde ?",
          options: ["Caspienne", "Supérieur", "Victoria", "Baïkal"],
          correctAnswer: 0,
        },
      ],
    },
  ],
};

// Fonction pour récupérer les quiz d'un niveau
export function getQuizzesForLevel(levelId: number): GameStep[] {
  if (levelId === 1) {
    return level1Quizzes.steps;
  }
  if (levelId === 2) {
    return level2Quizzes.steps;
  }
  return [];
}

