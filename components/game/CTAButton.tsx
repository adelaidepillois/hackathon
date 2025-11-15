import Link from 'next/link';

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
}

export default function CTAButton({ text, onClick, href }: CTAButtonProps) {
  const buttonClasses = "absolute left-1/2 -translate-x-1/2 bottom-16 lg:bottom-32 w-[85%] max-w-[357px] h-12 md:h-[50px] cursor-pointer rounded-full bg-[#2162DD] border-none flex items-center justify-center text-white font-neue font-bold text-sm md:text-[22px] hover:bg-[#1a52b8] transition-colors px-4 whitespace-nowrap";

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {text}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
    >
      {text}
    </button>
  );
}
