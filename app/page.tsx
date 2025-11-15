import './globals.css'
import UserBadge from '@/components/game/UserBadge'
import ScoreBadge from '@/components/game/ScoreBadge'
import PageTitle from '@/components/game/PageTitle'
import CTAButton from '@/components/game/CTAButton'
import NavigationDots from '@/components/game/NavigationDots'
import Link from 'next/link';

// Page principale
export default async function Home() {
  const username = "Username";
  const score = 200;

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-[1rem] rounded-2xl overflow-hidden -z-10">
        <img 
          src="/images/background.svg" 
          alt="Background" 
          className="w-full h-full object-cover" 
        />
      </div>
      {/* En-tête avec badges utilisateur */}
      <UserBadge label={username} position="left" />
      <ScoreBadge score={score} />

      {/* Titre et sous-titre centrés */}
      <PageTitle 
        title="FAKE NEWS DETECTOR"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus."
      />

      {/* Bouton d'action */}
      <CTAButton text="Commencer l'expérience" href="/levels" />

    </div>
  );
}
