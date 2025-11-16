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

// Données pour le niveau 1
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
						"C'est une blague scientifique classique. Le Monoxyde de Dihydrogène (H₂O) est le nom chimique de... l'eau ! Le mot 'DANGER' et le jargon chimique activent votre Biais de Négativité.",
				},
				{
					id: 2,
					type: "image",
					question:
						"Info : 'La NASA a dépensé des millions de dollars pour développer un stylo capable d'écrire en apesanteur, alors que les Russes utilisaient simplement un crayon.",
					options: ["Vrai", "Faux"],
					correctAnswer: 1,
					imageUrl: "/images/space_pen.png",
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
					imageUrl: "/images/led_danger.png",
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
					imageUrl: "/images/500_euro_crime.png",
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
					imageUrl: "/images/chemtrails.jpg",
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
					imageUrl: "/images/cash_vs_digital.png",
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

// Données pour le niveau 2
export const level2Quizzes: LevelQuizzes = {
	levelId: 2,
	steps: [
		{
			id: 1,
			title: "Étape 1",
			quiz: [
				{
					id: 8,
					type: "image",
					question:
						"Ce tweet montre une fillette en larmes serrant un chiot dans les bras pendant une inondation. Le message affirme que la scène se déroule actuellement aux États-Unis. Peut-on le considérer comme fiable tel quel ?",
					options: ["Vrai", "Faux"],
					correctAnswer: 1,
					imageUrl: "/images/flood_girl_dog_tweet.png",
					explanation:
						"Cette image est authentique, mais le tweet est trompeur : elle est souvent réutilisée hors contexte pour provoquer une réaction émotionnelle. Le message n’indique ni date, ni lieu vérifiable, ni lien vers une source officielle. Le combo enfant + animal + catastrophe + religion sert surtout à générer de l’engagement.",
				},
				{
					id: 9,
					type: "image",
					question:
						"Cette image satellite d’un cyclone a été diffusée avec des informations de localisation précises. Peut-on la considérer comme une photo fiable ?",
					options: ["Vrai", "Faux"],
					correctAnswer: 0,
					imageUrl: "/images/cycloneFlorence.jpg",
					explanation:
						"Cette image est bien réelle : elle provient de la NOAA ou de la NASA. Les agences scientifiques publient des images datées, localisées et accompagnées d’un texte neutre. L’absence de sensationnalisme et la présence d’une source institutionnelle sont de bons signaux de fiabilité.",
				},
				{
					id: 10,
					type: "image",
					question:
						"Cette photo montrant le pape dans une énorme doudoune blanche a circulé comme une vraie image. Est-ce une photo authentique ?",
					options: ["Vrai", "Faux"],
					correctAnswer: 1,
					imageUrl: "/images/popeBalenciaga.jpg",
					explanation:
						"Cette photo est générée par IA. Les détails incohérents (mains, croix, plis du vêtement, textures floues) la trahissent. Aucune source officielle ne l’a publiée. Le cerveau se fait facilement piéger par le biais d’autorité : on reconnaît une personnalité connue, donc on pense que l’image est vraie.",
				},
			],
		},
		{
			id: 2,
			title: "Étape 2",
			quiz: [
				{
					id: 11,
					type: "image",
					question:
						"Cette image montrant une femme et un enfant face aux ombres de soldats armés est présentée comme une scène réelle dans un camp de réfugiés. Peut-on la considérer comme fiable telle quelle ?",
					options: ["Vrai", "Faux"],
					correctAnswer: 1,
					imageUrl: "/images/desert_mother_child_shadows.png",
					explanation:
						"Cette image est souvent sortie de son contexte ou mise en scène. Aucun lieu, aucune date et aucune source vérifiable ne sont fournis. Les ombres nettes, l’esthétique très « cinématographique » et l’absence d’informations fiables doivent alerter. Avant d’y croire, il faut vérifier si des médias reconnus la relaient.",
				},
				{
					id: 12,
					type: "image",
					question:
						"Cette photo aérienne d'un village ravagé par des inondations est-elle authentique ?",
					options: ["Vrai", "Faux"],
					correctAnswer: 0,
					imageUrl: "/images/floods_germany_aerial.jpg",
					explanation:
						"Cette image est réelle : elle provient des inondations meurtrières en Allemagne en 2021 et a été publiée par des médias et autorités locales. Cependant, elle est souvent réutilisée hors contexte pour illustrer de fausses catastrophes. Une image vraie peut être utilisée pour transmettre une info fausse.",
				},
			],
		},
		{
			id: 3,
			title: "Étape 3",
			quiz: [
				{
					id: 13,
					type: "image",
					question:
						"Cette photo d'oiseaux retrouvés morts sur une route circule avec le message : « Encore une preuve que la 5G tue la faune sauvage instantanément ». Cette explication est-elle fiable ?",
					options: ["Vrai", "Faux"],
					correctAnswer: 1,
					imageUrl: "/images/birds5g.jpg",
					explanation:
						"La photo est réelle, mais l'explication est totalement fausse. Ce hoax revient régulièrement : des oiseaux morts sont associés à la 5G, aux ondes ou à un phénomène mystérieux. En réalité, ces événements ont des causes locales concrètes : intoxication alimentaire, collision avec un camion, choc thermique ou fuite toxique. L'image est vraie, mais l'interprétation est manipulée — un piège très courant.",
				},
			],
		},
	],
};

// Données pour le niveau 3
export const level3Quizzes: LevelQuizzes = {
	levelId: 3,
	steps: [
		{
			id: 1,
			title: "Étape 1",
			quiz: [
				{
					id: 14,
					type: "image",
					question:
						"Cette photo circule avec la légende : « Une femme retrouvée figée par le froid extrême dans une région isolée ». L’histoire est-elle fiable ?",
					options: ["Vrai", "Faux"],
					correctAnswer: 1,
					imageUrl: "/images/frozenWoman.avif",
					explanation:
						"Il s’agit d’une sculpture hyperréaliste prise dans un musée. L’image est souvent détournée pour inventer des scénarios sensationnalistes. La photo semble réaliste, mais plusieurs détails (texture trop lisse, posture figée, absence de contexte) permettent de douter.",
				},
			],
		},
		// {
		// 	id: 2,
		// 	title: "Étape 2",
		// 	quiz: [
		// 		{
		// 			id: 4,
		// 			type: "image",
		// 			question:
		// 				"Info : 'Les billets de 500€ sont le moyen le plus courant de financement des activités criminelles en Europe, ce qui a justifié leur retrait progressif.",
		// 			options: ["Vrai", "Faux"],
		// 			correctAnswer: 0,
		// 			imageUrl: "/images/500_euro_crime.png",
		// 			explanation:
		// 				"C'est VRAI. C'était l'argument officiel de la Banque Centrale Européenne pour l'arrêt de leur émission en 2019, car leur forte valeur facilitait le blanchiment et le financement du terrorisme.",
		// 		},
		// 		{
		// 			id: 5,
		// 			type: "image",
		// 			question:
		// 				"ATTENTION : 'Les chemtrails laissés par les avions dans le ciel sont des produits chimiques délibérément pulvérisés pour contrôler la météo ou la population.",
		// 			options: ["Vrai", "Faux"],
		// 			correctAnswer: 1,
		// 			imageUrl: "/images/chemtrails.jpg",
		// 			explanation:
		// 				"C'est FAUX : il s'agit d'une théorie du complot. Ces traînées sont des 'contrails' (nuages de condensation) composées de glace et d'eau. Le mot 'ATTENTION' active votre Biais de Négativité.",
		// 		},
		// 		{
		// 			id: 6,
		// 			type: "image",
		// 			question:
		// 				"FAIT : 'Seuls 10% de l'argent physique mondial est en circulation ; les 90% restants sont numériques ou virtuels.",
		// 			options: ["Vrai", "Faux"],
		// 			correctAnswer: 0,
		// 			imageUrl: "/images/cash_vs_digital.png",
		// 			explanation:
		// 				"C'est VRAI. Ce chiffre est exact selon les estimations. Le chiffre bas de '10%' peut inciter au doute (Biais d'Ancrage), mais c'est bien la réalité de l'économie moderne.",
		// 		},
		// 		{
		// 			id: 7,
		// 			question:
		// 				"Pourquoi les titres de presse 'choc' (catastrophes, scandales) attirent-ils plus notre attention que les nouvelles positives ?",
		// 			options: [
		// 				"À cause du Biais de Négativité",
		// 				"À cause du Biais d'Ancrage",
		// 				"À cause de la loi",
		// 				"À cause du Biais d'Autorité",
		// 			],
		// 			correctAnswer: 0,
		// 		},
		// 	],
		// },
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
