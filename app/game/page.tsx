// app/game/page.tsx
import styles from './game.module.css'
import '../globals.css'

// Types
interface UserInfoProps {
  username: string;
  score: number;
}

// Composants réutilisables
const UserBadge = ({ label, position }: { label: string; position: 'left' | 'right' }) => (
  <div 
    className={`absolute top-6 md:top-10 w-32 md:w-[172px] h-10 bg-white text-[#2162DD] 
                rounded-full flex items-center justify-center shadow font-neue text-sm md:text-base
                ${position === 'left' ? 'left-4 md:left-[86px]' : 'right-4 md:right-[86px]'}`}
  >
    {label}
  </div>
);

const ScoreBadge = ({ score }: { score: number }) => (
  <div 
    className="absolute top-6 md:top-10 right-4 md:right-[86px] w-32 md:w-[172px] h-10 
               bg-white text-[#2162DD] rounded-full flex items-center justify-center 
               shadow font-neue text-sm md:text-base"
  >
    <span className="md:hidden">{score} pt</span>
    <span className="hidden md:inline">{score} points</span>
  </div>
);

const PageTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 md:px-0">
    <h1
      className="text-white text-center mx-auto"
      style={{
        maxWidth: "1026px",
        fontFamily: "'Moore Trial Henry', serif",
        fontWeight: 200,
        fontSize: "clamp(48px, 8vw, 120px)", // Responsive font size
        lineHeight: "1.2",
      }}
    >
      {title}
    </h1>

    <p
      className="text-white text-center mx-auto mt-6 md:mt-10 px-4"
      style={{
        maxWidth: "749px",
        fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
        fontWeight: 45,
        fontSize: "clamp(16px, 2vw, 20px)", // Responsive font size
        lineHeight: "1.5",
      }}
    >
      {subtitle}
    </p>
  </div>
);

const CTAButton = ({ text, onClick }: { text: string; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-1/2 -translate-x-1/2 bottom-16 lg:bottom-32 
               w-[85%] max-w-[357px] h-12 md:h-[50px] cursor-pointer
               rounded-full bg-[#2162DD] border-none
               flex items-center justify-center
               text-white font-bold text-sm md:text-[22px]
               hover:bg-[#1a52b8] transition-colors px-4"
    style={{
      fontFamily: "'Neue Haas Grotesk Display Pro', sans-serif",
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </button>
);

const NavigationDots = ({ count = 3 }: { count?: number }) => (
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

// Page principale
export default async function GamePage() {
  const username = "Username";
  const score = 200;

  return (
    <div className={styles.bgPage}>
      {/* En-tête avec badges utilisateur */}
      <UserBadge label={username} position="left" />
      <ScoreBadge score={score} />

      {/* Titre et sous-titre centrés */}
      <PageTitle 
        title="FAKE NEWS DETECTOR"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus."
      />

      {/* Bouton d'action */}
      <CTAButton text="Commencer l'expérience" />

      {/* Points de navigation */}
      <NavigationDots count={3} />
    </div>
  );
}