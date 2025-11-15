import { styles } from "@/styles";

interface UserBadgeProps {
  label: string;
  position: 'left' | 'right';
}

export default function UserBadge({ label, position }: UserBadgeProps) {
  return (
    <div 
      className={`${styles.textBadge} absolute top-8 md:top-10 left-4 md:left-[86px] w-32 md:w-[172px] h-10 bg-white rounded-full flex items-center justify-center px-4 py-1 ml-4 md:ml-0`}>
      {label}
    </div>
  );
}
