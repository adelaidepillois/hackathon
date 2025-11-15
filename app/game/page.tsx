import styles from './game.module.css'
import '../globals.css'

const UserBadge = ({ label, position }: { label: string; position: 'left' | 'right' }) => (
  <div className={`${styles.userBadge} ${position === 'left' ? styles.badgeLeft : styles.badgeRight}`}>
    {label}
  </div>
);

const ScoreBadge = ({ score }: { score: number }) => (
  <div className={styles.scoreBadge}>
    <span className={styles.scoreMobile}>{score} pt</span>
    <span className={styles.scoreDesktop}>{score} points</span>
  </div>
);

const PageTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className={styles.titleContainer}>
    <h1 className={styles.mainTitle}>
      {title}
    </h1>
    <p className={styles.subtitle}>
      {subtitle}
    </p>
  </div>
);

const CTAButton = ({ text, onClick }: { text: string; onClick?: () => void }) => (
  <button onClick={onClick} className={styles.ctaButton}>
    {text}
  </button>
);

const NavigationDots = ({ count = 3 }: { count?: number }) => (
  <div className={styles.navDots}>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className={styles.navDot} />
    ))}
  </div>
);

// Page principale
export default async function GamePage() {
  const username = "Username";
  const score = 200;

  return (
    <div className={styles.bgPage}>
      <UserBadge label={username} position="left" />
      <ScoreBadge score={score} />
      <PageTitle 
        title="FAKE NEWS DETECTOR"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus."
      />
      <CTAButton text="Commencer l'expérience" />
      <NavigationDots count={3} />
    </div>
  );
}