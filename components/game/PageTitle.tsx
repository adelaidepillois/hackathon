interface PageTitleProps {
  title: string;
  subtitle: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 md:px-0">
      <h1
        className="text-white text-center mx-auto"
        style={{
          maxWidth: "1026px",
          fontFamily: "'Moore Trial Henry', serif",
          fontWeight: 200,
          fontSize: "clamp(48px, 8vw, 120px)",
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
          fontSize: "clamp(16px, 2vw, 20px)",
          lineHeight: "1.5",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}
