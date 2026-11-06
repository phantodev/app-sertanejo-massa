type VerifiedBadgeProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const SIZE = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
} as const;

/** Selo verificado: verde escuro oficial, check branco, sem borda. */
export function VerifiedBadge({ className = "", size = "sm" }: VerifiedBadgeProps) {
  return (
    <svg
      aria-label="Conta verificada"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`${SIZE[size]} shrink-0 ${className}`}
      fill="none"
    >
      <path
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        className="fill-fm-teal-dark"
      />
      <path
        d="m9 12 2 2 4-4"
        className="stroke-white"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
