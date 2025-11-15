interface PageTitleProps {
    title: string;
    subtitle: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 md:px-0">
            <h1 className="text-white text-center mx-auto font-moore text-[70px] md:text-[150px] max-w-[50%] leading-[0.8]">
                {title}
            </h1>

            <p className="text-white text-center mx-auto mt-6 md:mt-10 px-4 font-neue font-light text-[20px] md:text-[20px] max-w-[50%]">
                {subtitle}
            </p>
        </div>
    );
}
