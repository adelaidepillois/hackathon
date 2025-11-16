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
					correctAnswer: 1,
					imageUrl: "/images/imageQuizz1.png",
					explanation:
						"Cette image est authentique. Pour vérifier l'authenticité d'une image, vérifiez la source, la date de publication et utilisez des outils de recherche inversée d'images.",
				},
				{
					id: 2,
					type: "image",
					question:
						"Info : 'La NASA a dépensé des millions de dollars pour développer un stylo capable d'écrire en apesanteur, alors que les Russes utilisaient simplement un crayon.",
					options: ["Vrai", "Faux"],
					correctAnswer: 1,
					imageUrl: "/images/level1/space_pen.jpg",
					explanation:
						"C'est FAUX : c'est un mythe de la désinformation récurrent. L'entreprise Fisher Space Pen a développé le stylo sur fonds privés. La NASA l'a ensuite acheté, comme les Russes. Le récit est conçu pour ancrer l'idée de 'gaspillage gouvernemental'.",
				},
				{
					id: 3,
					type: "image",
					question:
						"DANGER : 'L'éclairage LED, massivement utilisé aujourd'hui, provoque des dommages irréversibles à la rétine, selon l'ANSES.",
					options: ["Vrai", "Faux"],
					correctAnswer: 0,
					imageUrl: "/images/level1/led_danger.jpg",
					explanation:
						"C'est VRAI, mais le titre est trompeur. L'ANSES a bien émis un rapport sur le risque pour les enfants et les LED très froides/puissantes. Le mot 'DANGER' est de la Négativité, mais le risque existe pour certaines conditions.",
				},
			],
		},
		{
			id: 2,
			title: "Étape 2",
			quiz: [
				{
					id: 4,
					type: "image",
					question:
						"Info : 'Les billets de 500€ sont le moyen le plus courant de financement des activités criminelles en Europe, ce qui a justifié leur retrait progressif.",
					options: ["Vrai", "Faux"],
					correctAnswer: 0,
					imageUrl: "/images/level1/500_euro_crime.jpg",
					explanation:
						"C'est VRAI. C'était l'argument officiel de la Banque Centrale Européenne pour l'arrêt de leur émission en 2019, car leur forte valeur facilitait le blanchiment et le financement du terrorisme.",
				},
				{
					id: 5,
					type: "image",
					question:
						"ATTENTION : 'Les chemtrails laissés par les avions dans le ciel sont des produits chimiques délibérément pulvérisés pour contrôler la météo ou la population.",
					options: ["Vrai", "Faux"],
					correctAnswer: 1,
					imageUrl: "/images/level1/chemtrails.jpg",
					explanation:
						"C'est FAUX : il s'agit d'une théorie du complot. Ces traînées sont des 'contrails' (nuages de condensation) composées de glace et d'eau. Le mot 'ATTENTION' active votre Biais de Négativité.",
				},
				{
					id: 6,
					type: "image",
					question:
						"FAIT : 'Seuls 10% de l'argent physique mondial est en circulation ; les 90% restants sont numériques ou virtuels.",
					options: ["Vrai", "Faux"],
					correctAnswer: 0,
					imageUrl: "/images/level1/cash_vs_digital.jpg",
					explanation:
						"C'est VRAI. Ce chiffre est exact selon les estimations. Le chiffre bas de '10%' peut inciter au doute (Biais d'Ancrage), mais c'est bien la réalité de l'économie moderne.",
				},
				{
					id: 7,
					question:
						"Pourquoi les titres de presse 'choc' (catastrophes, scandales) attirent-ils plus notre attention que les nouvelles positives ?",
					options: [
						"À cause du Biais de Négativité",
						"À cause du Biais d'Ancrage",
						"À cause de la loi",
						"À cause du Biais d'Autorité",
					],
					correctAnswer: 0,
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
					explanation:
						"La Russie est le plus grand pays du monde avec une superficie d'environ 17,1 millions de km². Elle s'étend sur deux continents : l'Europe et l'Asie.",
				},
				{
					id: 2,
					question: "Quelle est la plus haute montagne du monde ?",
					options: ["K2", "Mont Everest", "Kilimandjaro", "Mont Blanc"],
					correctAnswer: 1,
					explanation:
						"Le Mont Everest, situé dans l'Himalaya à la frontière entre le Népal et la Chine, est la plus haute montagne du monde avec une altitude de 8 848 mètres au-dessus du niveau de la mer.",
				},
				{
					id: 3,
					question: "Quel est le plus long fleuve du monde ?",
					options: ["Nil", "Amazone", "Mississippi", "Yangtsé"],
					correctAnswer: 0,
					explanation:
						"Le Nil est le plus long fleuve du monde avec une longueur d'environ 6 650 km. Il traverse 11 pays africains et se jette dans la Méditerranée.",
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
					explanation:
						"Le Groenland est la plus grande île du monde avec une superficie d'environ 2,16 millions de km². C'est un territoire autonome du Danemark situé dans l'océan Arctique.",
				},
				{
					id: 5,
					question: "Quel désert est le plus grand du monde ?",
					options: ["Sahara", "Gobi", "Antarctique", "Arctique"],
					correctAnswer: 2,
					explanation:
						"L'Antarctique est le plus grand désert du monde avec une superficie d'environ 14 millions de km². Un désert est défini par ses faibles précipitations, pas seulement par la chaleur.",
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
					explanation:
						"La mer Caspienne est le plus grand lac du monde avec une superficie d'environ 371 000 km². Bien qu'elle soit appelée 'mer', c'est techniquement un lac car elle est entourée de terres.",
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
