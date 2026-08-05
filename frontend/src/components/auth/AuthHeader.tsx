interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center">
      {/* <img
        src="/src/assets/logos/keystone_dark_logo.svg"
        alt="Keystone"
        className="mx-auto mb-6 h-14"
      /> */}

      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <p className="mt-2 text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}