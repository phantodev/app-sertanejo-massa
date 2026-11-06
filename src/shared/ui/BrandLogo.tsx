import { Link } from "react-router-dom";

type BrandLogoProps = {
  href?: string;
  className?: string;
  compact?: boolean;
};

export function BrandLogo({ href = "/", className = "", compact = false }: BrandLogoProps) {
  const content = (
    <>
      <span className="flex h-11 w-[34px] items-center justify-center gap-[3px]">
        {[12, 23, 35, 43, 35, 23, 12].map((h, i) => (
          <i
            key={i}
            className="w-0.5 rounded-full bg-massa-gold shadow-[0_0_9px_#e6a04b36]"
            style={{ height: h }}
          />
        ))}
      </span>
      {!compact ? (
        <span className="flex flex-col text-[10px] font-extrabold leading-tight tracking-[0.07em] sm:text-sm">
          SERTANEJO{" "}
          <strong className="text-xl tracking-[0.035em] text-massa-gold">
            MASSA<span className="text-white">.</span>
          </strong>
        </span>
      ) : null}
    </>
  );

  return (
    <Link
      to={href}
      aria-label="Sertanejo Massa, voltar ao início"
      className={`inline-flex min-w-max items-center gap-3 ${className}`}
    >
      {content}
    </Link>
  );
}
