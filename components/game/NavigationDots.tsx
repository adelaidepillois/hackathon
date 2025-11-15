interface NavigationDotsProps {
  count?: number;
}

export default function NavigationDots({ count = 3 }: NavigationDotsProps) {
  return (
    <div className="hidden md:flex absolute right-[50px] bottom-[50px] 
                    flex-col items-center gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-[50px] h-[50px] rounded-full 
                     border border-[#2162DD] box-border
                     hover:bg-[#2162DD] hover:bg-opacity-20 transition-all cursor-pointer"
        />
      ))}
    </div>
  );
}
