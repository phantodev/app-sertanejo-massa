type TypingIndicatorProps = {
  name?: string;
};

export function TypingIndicator({ name }: TypingIndicatorProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-massa-border bg-[#181411] px-3 py-2.5">
        <span className="size-1.5 animate-bounce rounded-full bg-massa-gold [animation-delay:-0.3s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-massa-gold [animation-delay:-0.15s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-massa-gold" />
      </div>
      <span className="text-[11px] text-massa-muted">
        {name ? `${name} está digitando…` : "digitando…"}
      </span>
    </div>
  );
}
