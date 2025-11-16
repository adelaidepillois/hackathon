export interface Level {
	id: number;
	title: string;
	description: string;
	codex?: string[];
}

export const levels: Level[] = [
	{
		id: 1,
		title: "Niveau 1",
		description: ` Apprendre les réflexes de base. Vous vous entraînerez à repérer les URL suspectes, les images sorties de leur contexte et les "promesses miracles".`,
		codex: ["Biais d'Ancrage : Tendance à se fier excessivement au premier chiffre ou à la première information reçue, influençant ensuite tout jugement, même lorsque l'ancre est arbitraire ou fausse.", "Biais de Négativité : Tendance à accorder plus de poids, de crédibilité et d'attention aux informations négatives ou menaçantes (scandales, catastrophes) qu'aux informations neutres ou positives."],
	},
	{
		id: 2,
		title: "Niveau 2",
		description:
			"Le Détective Émotionnel. Mission : maîtriser ses propres impulsions. Ici, l'ennemi est souvent votre propre cerveau. Vous apprendrez à déjouer le clickbait, les mèmes trompeurs et les appels à l'émotion.",
		codex: ["Biais de Confirmation : Tendance à rechercher, interpréter et ne mémoriser que les informations qui confirment nos croyances ou hypothèses existantes, renforçant notre \"bulle de filtre\".", "Biais de Disponibilité : Tendance à juger la probabilité d'un événement par la facilité avec laquelle des exemples frappants (souvent dramatiques et très médiatisés) nous viennent à l'esprit.","Biais d'Aversion à la Perte : Tendance à réagir de manière disproportionnée face à la menace de perdre un avantage (argent, statut, droit) plutôt qu'à la promesse d'un gain équivalent, souvent exploité par les arnaques."],
	},
	{
		id: 3,
		title: "Niveau 3",
		description:
			"Le Maître de la Nuance. Mission : entrer dans l'élite du fact-checking. Vous affronterez des défis complexes : identifier la satire, analyser des statistiques trompeuses et démasquer les arguments d'autorité fallacieux.",
		codex: ["Effet Dunning-Kruger : Tendance des personnes ayant une faible compétence dans un domaine à surestimer grossièrement leur propre niveau d'expertise (souvent résumé par : \"J'ai fait mes propres recherches\").", "Biais d'Autorité : Tendance à accorder une valeur excessive à une affirmation simplement parce qu'elle provient d'une figure d'autorité (expert, titre, célébrité), même si celle-ci parle en dehors de son domaine de compétence.", "Biais de Causalité Fallacieuse :Tendance à établir une relation de cause à effet directe entre deux événements, alors qu'ils ne sont en réalité que statistiquement corrélés par un facteur tiers (Ex: Glaces et Noyades)."],
	},
];

export function getLevelById(id: number): Level | undefined {
	return levels.find(level => level.id === id);
}

