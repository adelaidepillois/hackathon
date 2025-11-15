interface ScoreBadgeProps {
  score: number;
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  return (
    <div 
      className="absolute top-6 md:top-10 right-4 md:right-[86px] w-32 md:w-[172px] h-10 
                 bg-white text-[#2162DD] rounded-full flex items-center justify-center 
                 shadow font-neue text-sm md:text-base"
    >
      <span className="md:hidden">{score} pt</span>
      <span className="hidden md:inline">{score} points</span>
    </div>
  );
}
