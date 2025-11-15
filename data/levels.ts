export interface Level {
	id: number;
	title: string;
	description: string;
	className: string;
	enabled: boolean;
}

export const levels: Level[] = [
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

export function getLevelById(id: number): Level | undefined {
	return levels.find(level => level.id === id);
}

