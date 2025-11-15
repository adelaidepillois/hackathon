"use client";

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
					<div className="flex flex-col gap-4 items-center w-full max-w-sm mx-auto pt-[80px] lg:pt-0">
						<label htmlFor="username" className={styles.usernameLabel}>
							Ton username
						</label>
						<input
							id="username"
							type="text"
							placeholder="Jane Doe"
							className={styles.usernameInput}
						/>
					</div>

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

