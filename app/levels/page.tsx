"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import LevelCard from "@/components/card/LevelCard";
import { styles } from "@/styles";

const levels = [
	{
		id: 1,
		title: "Niveau 1",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sed! Eos ipsum doloremque, praesentium tempora sed at blanditiis ex, impedit dolorem labore eveniet ea ut mollitia ipsa optio iure perferendis.",
		className: "lg:translate-x-[15%] lg:translate-y-[10%] lg:z-30 lg:-rotate-6 cursor-pointer",
		enabled: true,
	},
	{
		id: 2,
		title: "Niveau 2",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sed! Eos ipsum doloremque, praesentium tempora sed at blanditiis ex, impedit dolorem labore eveniet ea ut mollitia ipsa optio iure perferendis.",
		className: "lg:z-20 lg:rotate-0 lg:blur-[5px] lg:shadow-2xl lg:shadow-black/30 cursor-not-allowed",
		enabled: false,
	},
	{
		id: 3,
		title: "Niveau 3",
		description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sed! Eos ipsum doloremque, praesentium tempora sed at blanditiis ex, impedit dolorem labore eveniet ea ut mollitia ipsa optio iure perferendis.",
		className: "lg:translate-x-[-15%] lg:translate-y-[10%] lg:z-10 lg:rotate-6 lg:blur-[5px] cursor-not-allowed",
		enabled: false,
	},
];

export default function LevelsPage() {
	const router = useRouter();
	const { refreshUser, setUser } = useUser();
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
				const errorMessage = data.details 
					? `${data.error}: ${data.details}` 
					: data.error || "Erreur lors de la sauvegarde";
				throw new Error(errorMessage);
			}

			setMessage({ type: "success", text: "Username enregistré avec succès !" });
			
			// Utiliser directement les données retournées par l'API
			if (data.user) {
				setUser({
					username: data.user.username,
					score: data.user.score ?? 0,
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
				text: error instanceof Error ? error.message : "Une erreur est survenue",
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
					<form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full max-w-sm mx-auto pt-[80px] lg:pt-0">
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
							<p className={`text-sm ${message.type === "success" ? "text-green-300" : "text-red-300"}`}>
								{message.text}
							</p>
						)}
					</form>

					<div className="flex flex-col gap-4 w-full px-4 lg:px-0 lg:flex-row lg:items-center lg:justify-center">
						{levels.map((level) => (
							<LevelCard
								key={level.id}
								title={level.title}
								description={level.description}
								className={level.className}
							/>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}

