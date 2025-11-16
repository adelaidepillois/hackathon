import '../globals.css'
import GameContent from '@/components/game/GameContent';
import { getLevelById } from '@/data/levels';

// Page principale
export default async function GamePage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const params = await searchParams;
  const levelId = params.level ? parseInt(params.level, 10) : 1;
  const level = getLevelById(levelId);

  // Valeurs par défaut si le niveau n'existe pas
  const title = level?.title || `Niveau ${levelId}`;
  const subtitle = level?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.";
  const biases = level?.biases || [];
  const codex = level?.codex || [];

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-[1rem] rounded-2xl overflow-hidden -z-10">
        <img
          src="/images/background.svg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <GameContent title={title} subtitle={subtitle} levelId={levelId} biases={biases} codex={codex} />
    </div>
  );
}