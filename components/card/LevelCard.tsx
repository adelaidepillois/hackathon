import { styles } from "@/styles";

type LevelCardProps = {
	title: string;
	description: string;
	className?: string;
};

export default function LevelCard({
	title,
	description,
	className,
}: LevelCardProps) {
	return (
		<div className={`flex flex-col justify-between px-5 py-4 border-white border rounded-[10px] bg-[hsl(219,73%,50%,0.3)] backdrop-blur-md text-white flex flex-col w-full lg:max-w-sm lg:w-[22rem] transition-transform duration-300 hover:scale-105
        ${className ?? ""}
      `}>
			<h2 className={styles.levelCardTitle}>
				{title}
			</h2>
			<p className={styles.levelCardDescription}>{description}</p>
			<div className="flex justify-between items-center">
				<p className={styles.levelCardAction}>Commencer</p>
				<span className={styles.levelCardAction}>→</span>
			</div>
		</div>
	);
}
