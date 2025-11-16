export type QuizQuestionType = "text" | "image";

export interface QuizQuestion {
  id: number;
  type?: QuizQuestionType; // Par défaut "text"
  question: string;
  options: string[];
  correctAnswer: number; // Index de la bonne réponse
  imageUrl?: string; // URL de l'image pour les questions de type "image"
  explanation?: string; // Explication de la réponse
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
          type: "image",
          question: "Cette image est-elle authentique ?",
          options: ["Vrai", "Faux"],
          correctAnswer: 0,
          imageUrl: "/images/imageQuizz1.png",
          explanation: "Cette image est authentique. Pour vérifier l'authenticité d'une image, vérifiez la source, la date de publication et utilisez des outils de recherche inversée d'images.",
        },
        {
          id: 2,
          question: "Quelle est la capitale de la France ?",
          options: ["Paris", "Lyon", "Marseille", "Toulouse"],
          correctAnswer: 0,
          explanation: "Paris est la capitale de la France depuis 987. C'est la plus grande ville de France et le centre politique, économique et culturel du pays.",
        },
        {
          id: 3,
          question: "Combien de continents y a-t-il sur Terre ?",
          options: ["5", "6", "7", "8"],
          correctAnswer: 2,
          explanation: "Il y a 7 continents sur Terre : Afrique, Antarctique, Asie, Europe, Amérique du Nord, Océanie et Amérique du Sud. Cette classification est la plus communément acceptée.",
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
          explanation: "L'océan Pacifique est le plus grand océan du monde, couvrant environ un tiers de la surface terrestre. Il s'étend de l'Asie et de l'Australie à l'ouest jusqu'aux Amériques à l'est.",
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
          explanation: "La Russie est le plus grand pays du monde avec une superficie d'environ 17,1 millions de km². Elle s'étend sur deux continents : l'Europe et l'Asie.",
        },
        {
          id: 2,
          question: "Quelle est la plus haute montagne du monde ?",
          options: ["K2", "Mont Everest", "Kilimandjaro", "Mont Blanc"],
          correctAnswer: 1,
          explanation: "Le Mont Everest, situé dans l'Himalaya à la frontière entre le Népal et la Chine, est la plus haute montagne du monde avec une altitude de 8 848 mètres au-dessus du niveau de la mer.",
        },
        {
          id: 3,
          question: "Quel est le plus long fleuve du monde ?",
          options: ["Nil", "Amazone", "Mississippi", "Yangtsé"],
          correctAnswer: 0,
          explanation: "Le Nil est le plus long fleuve du monde avec une longueur d'environ 6 650 km. Il traverse 11 pays africains et se jette dans la Méditerranée.",
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
          explanation: "Le Groenland est la plus grande île du monde avec une superficie d'environ 2,16 millions de km². C'est un territoire autonome du Danemark situé dans l'océan Arctique.",
        },
        {
          id: 5,
          question: "Quel désert est le plus grand du monde ?",
          options: ["Sahara", "Gobi", "Antarctique", "Arctique"],
          correctAnswer: 2,
          explanation: "L'Antarctique est le plus grand désert du monde avec une superficie d'environ 14 millions de km². Un désert est défini par ses faibles précipitations, pas seulement par la chaleur.",
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
          explanation: "La mer Caspienne est le plus grand lac du monde avec une superficie d'environ 371 000 km². Bien qu'elle soit appelée 'mer', c'est techniquement un lac car elle est entourée de terres.",
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

