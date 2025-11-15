"use client";

import Link from "next/link";
import { styles } from "@/styles";

type LevelCardProps = {
	title: string;
	description: string;
	biases?: string[];
	className?: string;
	href?: string;
};

export default function LevelCard({
	title,
	description,
	biases,
	className,
	href,
}: LevelCardProps) {
	const cardContent = (
		<div
			className={`flex flex-col h-full min-h-[300px] lg:h-[400px] justify-between px-5 py-4 border-white border rounded-[10px] bg-[hsl(219,73%,50%,0.3)] backdrop-blur-md text-white w-full lg:w-[22rem] transition-all duration-300 hover:scale-105 lg:hover:z-50 relative
        ${className ?? ""}
      `}
		>
			<h2 className={styles.levelCardTitle}>{title}</h2>
			<div>
				<p className={styles.levelCardDescription}>{description}</p>
			</div>
			<div className="flex justify-between items-center mt-6">
				<p className={styles.levelCardAction}>Commencer</p>
				<span className={styles.levelCardAction}>→</span>
			</div>
		</div>
	);

	if (href) {
		return (
			<Link href={href} className="block">
				{cardContent}
			</Link>
		);
	}

	return cardContent;
}
