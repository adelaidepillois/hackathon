"use client";

import LevelCard from "@/components/card/LevelCard";

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
			<div className="relative w-full py-5 px-6 mx-auto min-h-screen">
				<div className="flex flex-col justify-center gap-[8rem] pt-[calc(15vh)] ">
						{/* Username */}
						<div className="flex flex-col items-center gap-2 w-full max-w-sm mx-auto ">
							<label
								htmlFor="username"
								className="text-white font-bold text-2xl"
							>
								Ton username
							</label>
							<input
								id="username"
								type="text"
								placeholder="Jane Doe"
								className="p-4 bg-[hsl(208,57%,60%,0.2)] placeholder-white italic border border-white rounded-full w-full text-white text-xl focus:outline-none focus:border-white"
							/>
						</div>

						{/* --- CARTES CENTRÉES --- */}
						<div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-center">
							<LevelCard
								title="Niveau 1"
								description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sed! Eos ipsum doloremque, praesentium tempora sed at blanditiis ex, impedit dolorem labore eveniet ea ut mollitia ipsa optio iure perferendis."
								className="
                  w-full max-w-sm
                  lg:translate-x-[15%]
                  lg:translate-y-[10%]
                  lg:z-30
									lg:-rotate-6
                  cursor-pointer
								"
							/>

							<LevelCard
								title="Niveau 2"
								description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sed! Eos ipsum doloremque, praesentium tempora sed at blanditiis ex, impedit dolorem labore eveniet ea ut mollitia ipsa optio iure perferendis."
								className="
                  w-full max-w-sm
                  lg:z-20
									lg:rotate-0
									blur-[5px]
									shadow-2xl shadow-black/30
                  cursor-not-allowed
								"
							/>

							<LevelCard
								title="Niveau 3"
								description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, sed! Eos ipsum doloremque, praesentium tempora sed at blanditiis ex, impedit dolorem labore eveniet ea ut mollitia ipsa optio iure perferendis."
								className="
                  w-full max-w-sm
                  lg:translate-x-[-15%]
                  lg:translate-y-[10%]
                  lg:z-10
									lg:rotate-6
									blur-[5px]
                  cursor-not-allowed
								"
							/>
						</div>
					</div>
			</div>
		</main>
	);
}
