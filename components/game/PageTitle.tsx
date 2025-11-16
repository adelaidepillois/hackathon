import { styles } from "@/styles";

interface PageTitleProps {
	title: string;
	subtitle: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
	return (
		<div className="w-full px-4 md:px-0 ">
			<h1 className={`${styles.headingH1} text-center mx-auto`}>{title}</h1>

			<p
				className={`${styles.paragraphLarge} text-center mx-auto mt-6 md:mt-10 px-2`}
			>
				{subtitle}
			</p>
		</div>
	);
}
