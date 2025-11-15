import { styles } from "@/styles";

type LevelCardProps = {
	title: string;
	description: string;
	biases?: string[];
	className?: string;
};

export default function LevelCard({
	title,
	description,
	biases,
	className,
}: LevelCardProps) {
	return (
		<div
			className={`flex flex-col h-full justify-between px-5 py-4 border-white border rounded-[10px] bg-[hsl(219,73%,50%,0.3)] backdrop-blur-md text-white w-full lg:max-w-sm lg:w-[22rem] transition-transform duration-300 hover:scale-105
        ${className ?? ""}
      `}
		>
			<h2 className={styles.levelCardTitle}>{title}</h2>
			<div>
				<p className={styles.levelCardDescription}>{description}</p>
				<p className="mt-4 font-bold text-lg">Biais introduits:</p>
				<ul>
					{biases &&
						biases.map((bias, index) => (
							<li
								key={index}
								className="text-md mt-1 list-disc list-outside ml-5"
							>
								{bias}
							</li>
						))}
				</ul>
			</div>
			<div className="flex justify-between items-center mt-6">
				<p className={styles.levelCardAction}>Commencer</p>
				<span className={styles.levelCardAction}>→</span>
			</div>
		</div>
	);
}
