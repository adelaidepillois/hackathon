import "./globals.css";
import UserBadge from "@/components/game/UserBadge";
import ScoreBadge from "@/components/game/ScoreBadge";
import PageTitle from "@/components/game/PageTitle";
import CTAButton from "@/components/game/CTAButton";

// Page principale
export default async function Home() {
	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
			<div className="fixed inset-[1rem] rounded-2xl overflow-hidden -z-10">
				<img
					src="/images/background.svg"
					alt="Background"
					className="w-full h-full object-cover"
				/>
			</div>
			{/* En-tête avec badges utilisateur */}

			{/* Titre et sous-titre centrés */}
			<PageTitle
				title="FAKE NEWS DETECTOR"
				subtitle="Notre monde est noyé sous les fake news et l'infobésité. Votre mission : apprendre à démêler le vrai du faux.
Analysez les cartes d'information qui défilent. Swipez à gauche ( Faux) si l'info est trompeuse, swipez à droite ( Vrai) si elle est fiable.
Chaque réponse vous rapporte de l'XP, aiguise votre esprit critique et vous rapproche du titre de Maître Fact-Checker. Prêt à commencer l'enquête ?


"
			/>

			{/* Bouton d'action */}
			<CTAButton text="Commencer l'expérience" href="/levels" />
		</div>
	);
}
