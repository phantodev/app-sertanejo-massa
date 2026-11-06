import { Link } from "react-router-dom";

type BrandLogoProps = {
  href?: string;
  className?: string;
  compact?: boolean;
  /** `transparent` = logo sem fundo. `solid` = logo com fundo. */
  variant?: "solid" | "transparent";
};

export function BrandLogo({
  href = "/feed",
  className = "",
  compact = false,
  variant = "solid",
}: BrandLogoProps) {
  const src =
    variant === "transparent" ? "/assets/logo-massa-transparente.png" : "/assets/logo-massa.png";

  return (
    <Link
      to={href}
      aria-label="Sertanejo Massa, voltar ao início"
      className={`inline-flex min-w-max items-center ${className}`}
    >
      <img
        src={src}
        alt="Sertanejo Massa"
        className={compact ? "h-12 w-auto" : "h-16 w-auto sm:h-[4.5rem]"}
      />
    </Link>
  );
}
