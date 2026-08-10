interface WelcomeBannerProps {
  title: string;
  subtitle: string;
}

export default function WelcomeBanner({
  title,
  subtitle,
}: WelcomeBannerProps) {
  return (
    <section
      className="
        rounded-2xl
        border
        bg-card
        p-6
        shadow-sm
      "
    >
      <h1
        className="
          text-3xl
          font-bold
          text-foreground
        "
      >
        {title}
      </h1>

      <p
        className="
          mt-2
          text-muted-foreground
        "
      >
        {subtitle}
      </p>
    </section>
  );
}