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
		<div
			className={`
        px-5 py-4 border-white border-2 rounded-2xl
        bg-[hsl(219,73%,50%,0.3)] backdrop-blur-md
        text-white flex flex-col w-full max-w-sm lg:w-[22rem] gap-6
        ${className ?? ""}
      `}
		>
			<h2
				className="text-2xl
    sm:text-3xl
    md:text-4xl
    lg:text-5xl
    xl:text-[4rem]
    leading-tight
    uppercase"
			>
				{title}
			</h2>
			<p className="text-base md:text-lg lg:text-xl">{description}</p>
			<div className="flex justify-between items-center mt-6">
				<p className="text-xl md:text-2xl lg:text-3xl">Commencer</p>
				<span className="text-xl md:text-2xl lg:text-3xl">→</span>
			</div>
		</div>
	);
}
