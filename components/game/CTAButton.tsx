import { styles } from '@/styles';
import Link from 'next/link';

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
}

export default function CTAButton({ text, onClick, href }: CTAButtonProps) {
  const buttonClasses = "fixed left-1/2 -translate-x-1/2 bottom-4 md:bottom-8 cursor-pointer rounded-full px-6 py-2 bg-[#2162DD] border-[#2162DD] border flex items-center justify-center hover:bg-transparent hover:text-[#2162DD] transition-all duration-500 whitespace-nowrap";

  if (href) {
    return (
      <Link href={href} className={`${styles.buttonText} ${buttonClasses}`}>
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
