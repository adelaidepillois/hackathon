export interface Level {
	id: number;
	title: string;
	description: string;
	biases?: string[];
}

export const levels: Level[] = [
	{
		id: 1,
		title: "Niveau 1",
		description: ` Apprendre les réflexes de base. Vous vous entraînerez à repérer les URL suspectes, les images sorties de leur contexte et les "promesses miracles".`,
		biases: [
			"Biais d'Ancrage : ne pas se laisser aveugler par le titre.",
			"Biais de Négativité : ne pas surréagir aux nouvelles alarmistes",
		],
	},
	{
		id: 2,
		title: "Niveau 2",
		description:
			"Le Détective Émotionnel. Mission : maîtriser ses propres impulsions. Ici, l'ennemi est souvent votre propre cerveau. Vous apprendrez à déjouer le clickbait, les mèmes trompeurs et les appels à l'émotion.",
		biases: [
			"Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
		],
	},
	{
		id: 3,
		title: "Niveau 3",
		description:
			"Le Maître de la Nuance. Mission : entrer dans l'élite du fact-checking. Vous affronterez des défis complexes : identifier la satire, analyser des statistiques trompeuses et démasquer les arguments d'autorité fallacieux.",
		biases: [
			"Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
		],
	},
];

export function getLevelById(id: number): Level | undefined {
	return levels.find(level => level.id === id);
}

