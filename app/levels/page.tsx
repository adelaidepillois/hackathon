"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import LevelCard from "@/components/card/LevelCard";
import { styles } from "@/styles";

const levels = [
	{
		id: 1,
		title: "Niveau 1",
		description: ` Apprendre les réflexes de base. Vous vous entraînerez à repérer les URL suspectes, les images sorties de leur contexte et les "promesses miracles".`,
		biases: [
			"Biais d'Ancrage : ne pas se laisser aveugler par le titre.",
			"Biais de Négativité : ne pas surréagir aux nouvelles alarmistes",
		],
		className:
			"lg:translate-x-[15%] lg:translate-y-[10%] lg:z-30 lg:-rotate-6 cursor-pointer",
		enabled: true,
	},
	{
		id: 2,
		title: "Niveau 2",
		description:
			"Le Détective Émotionnel. Mission : maîtriser ses propres impulsions. Ici, l'ennemi est souvent votre propre cerveau. Vous apprendrez à déjouer le clickbait, les mèmes trompeurs et les appels à l'émotion.",
		biases: [
			"Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
		],
		className:
			"lg:z-20 lg:rotate-0 blur-[3px] lg:blur-[5px] lg:shadow-2xl lg:shadow-black/30 cursor-not-allowed",
		enabled: false,
	},
	{
		id: 3,
		title: "Niveau 3",
		description:
			"Le Maître de la Nuance. Mission : entrer dans l'élite du fact-checking. Vous affronterez des défis complexes : identifier la satire, analyser des statistiques trompeuses et démasquer les arguments d'autorité fallacieux.",
		biases: [
			"Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
		],
		className:
			"lg:translate-x-[-15%] lg:translate-y-[10%] lg:z-10 lg:rotate-6 blur-[3px] lg:blur-[5px] cursor-not-allowed",
		enabled: false,
	},
];

export default function LevelsPage() {
	const router = useRouter();
	const { refreshUser, setUser, user } = useUser();
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	// Rafraîchir les données utilisateur au montage de la page
	useEffect(() => {
		refreshUser();
	}, [refreshUser]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!username.trim()) {
			setMessage({ type: "error", text: "Veuillez entrer un username" });
			return;
		}

		setIsLoading(true);
		setMessage(null);

		try {
			const response = await fetch("/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username: username.trim() }),
			});

			const data = await response.json();

			if (!response.ok) {
				// Gérer les erreurs de configuration spécifiquement
				if (data.error === "Configuration error") {
					throw new Error(
						`Erreur de configuration: ${data.details || "Variables d'environnement manquantes"}`
					);
				}
				
				// Gérer les erreurs RLS avec un message plus clair
				if (data.error === "RLS Policy Error") {
					throw new Error(
						`Erreur de sécurité: ${data.details || "Accès refusé à la base de données"}\n\n${data.hint || ""}`
					);
				}
				
				// Message d'erreur générique
				const errorMessage = data.details
					? `${data.error}: ${data.details}`
					: data.error || "Erreur lors de la sauvegarde";
				throw new Error(errorMessage);
			}

			setMessage({
				type: "success",
				text: "Hello human !",
			});

			// Utiliser directement les données retournées par l'API
			if (data.user) {
				setUser({
					username: data.user.username,
					score: data.user.score ?? 0,
					level: data.user.level ?? 1,
				});
			} else {
				// Sinon, rafraîchir depuis le cookie
				setTimeout(async () => {
					await refreshUser();
				}, 100);
			}
		} catch (error) {
			setMessage({
				type: "error",
				text:
					error instanceof Error ? error.message : "Une erreur est survenue",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="relative w-full min-h-screen">
			<div className="fixed inset-[1rem] rounded-2xl overflow-hidden -z-10">
				<img
					src="/images/background.svg"
					alt="Background"
					className="w-full h-full object-cover"
				/>
			</div>
			
			<div className="w-full mx-auto flex flex-col items-center py-8 lg:relative lg:justify-center lg:h-screen lg:py-0">
				<div className="flex flex-col items-center gap-8 w-full px-4">
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-4 items-center w-full max-w-sm mx-auto pt-[80px] lg:pt-0 relative px-4"
					>
						<label htmlFor="username" className={styles.usernameLabel}>
							Ton username
						</label>
						<input
							id="username"
							type="text"
							placeholder="janedoe"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							disabled={isLoading}
							className={`${styles.usernameInput} px-4 py-2 bg-[hsl(208,57%,60%,0.2)] border border-white rounded-full w-full focus:outline-none focus:border-white disabled:opacity-50`}
						/>
						{message && (
							<div className="absolute -right-16 py-4 px-6 top-2 bg-white rounded-full border-[#3d55de] border-4 rotate-[21deg] shadow-lg shadow-black/20 ">
								<p
									className={`text-sm font-neue font-bold ${
										message.type === "success"
											? "text-blue-600"
											: "text-red-300"
									}`}
								>
									{message.text}
								</p>
							</div>
						)}
					</form>

					<div className="flex flex-col gap-4 w-full px-4 lg:px-0 lg:flex-row lg:items-center lg:justify-center">
						{levels.map((level) => {
							// Un niveau est activé s'il est dans la liste enabled OU si l'utilisateur a atteint ce niveau
							// MAIS le niveau 1 nécessite un username
							const userLevel = user?.level || 1;
							const hasUsername = !!user?.username;
							const isEnabled = (level.enabled || level.id <= userLevel) && (level.id === 1 ? hasUsername : true);
							
							// Ajuster le className pour les niveaux débloqués
							let className = level.className;
							if (isEnabled) {
								className = className.replace("cursor-not-allowed", "cursor-pointer");
								className = className.replace("lg:blur-[5px]", "");
								className = className.replace("blur-[3px]", "");
								className = className.replace("blur-[5px]", "");
							} else {
								// S'assurer que les classes de désactivation sont présentes
								if (!className.includes("cursor-not-allowed")) {
									className += " cursor-not-allowed";
								}
								if (level.id === 1 && !hasUsername && !className.includes("lg:blur-[5px]")) {
									className += " lg:blur-[5px]";
								}
							}
							
							return (
								<LevelCard
									key={level.id}
									title={level.title}
									description={level.description}
									biases={level.biases}
									className={className}
									href={isEnabled ? `/game?level=${level.id}` : undefined}
								/>
							);
						})}
					</div>

					<Link 
						href="/leaderboard"
						className={`${styles.buttonText} fixed bottom-4 right-4 md:bottom-8 md:right-8 px-6 py-1 rounded-full bg-[#2162DD] border-[#2162DD] border hover:bg-transparent hover:text-white hover:border-white transition-all duration-500 z-50`}
					>
						Voir le podium
					</Link>
				</div>
			</div>
		</main>
	);
}
