import { styles } from '@/styles';

interface PageTitleProps {
    title: string;
    subtitle: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 md:px-0">
            <h1 className={`${styles.headingH1} text-center mx-auto`}>
                {title}
            </h1>

            <p className={`${styles.paragraphLarge} text-center mx-auto mt-6 md:mt-10 px-4`}>
                {subtitle}
            </p>
        </div>
    );
}
