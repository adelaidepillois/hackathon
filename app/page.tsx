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
				subtitle="Bienvenue dans Le Détecteur, votre nouvelle salle de sport pour cerveau ! Nous avons transformé l'apprentissage de la vérification de l'info en un jeu rapide et addictif où vous devenez un véritable Agent Critique. Pourquoi est-ce si important ? Parce qu'aujourd'hui, nous sommes noyés sous l'infobésité, les fake news et les manipulations, et il est devenu vital de savoir trier le vrai du faux. L'objectif éducatif n'est donc pas seulement de gagner des points, c'est d'affûter votre esprit critique. En jouant, vous entraînerez votre cerveau à reconnaître les biais cognitifs (ces pièges mentaux qui nous piègent tous) et à développer le réflexe de la vérification avant de croire."
			/>

			{/* Bouton d'action */}
			<CTAButton text="Commencer l'expérience" href="/levels" />
		</div>
	);
}
