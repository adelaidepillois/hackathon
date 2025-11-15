interface UserBadgeProps {
  label: string;
  position: 'left' | 'right';
}

export default function UserBadge({ label, position }: UserBadgeProps) {
  return (
    <div 
      className={`absolute top-6 md:top-10 w-32 md:w-[172px] h-10 bg-white text-[#2162DD] 
                  rounded-full flex items-center justify-center shadow font-neue text-sm md:text-base
                  ${position === 'left' ? 'left-4 md:left-[86px]' : 'right-4 md:right-[86px]'}`}
    >
      {label}
    </div>
  );
}
