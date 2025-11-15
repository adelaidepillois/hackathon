import { styles } from "@/styles";

interface ScoreBadgeProps {
  score?: number | null;
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  const displayScore = score ?? 0;
  const isSingular = displayScore === 0 || displayScore === 1;

  return (
    <div 
      className={`${styles.textBadge} absolute top-8 md:top-10 right-4 md:right-[86px] w-32 md:w-[172px] h-10 bg-white rounded-full flex items-center justify-center px-4 py-1 mr-4 md:mr-0`}
    >
      <span className="md:hidden">{displayScore} {isSingular ? 'pt' : 'pts'}</span>
      <span className="hidden md:inline">{displayScore} {isSingular ? 'point' : 'points'}</span>
    </div>
  );
}
