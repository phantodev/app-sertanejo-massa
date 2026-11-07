import { SearchField } from "@heroui/react";

type MassaSearchFieldProps = {
  "aria-label": string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

/** Mesmo padrão visual do campo “Pesquisar” do painel de sugestões do feed. */
export function MassaSearchField({
  "aria-label": ariaLabel,
  placeholder,
  value,
  onChange,
  className = "",
}: MassaSearchFieldProps) {
  return (
    <SearchField aria-label={ariaLabel} className={`w-full ${className}`}>
      <SearchField.Group className="h-12 w-full rounded-xl border border-solid border-fm-purple/25 bg-fm-yellow-bright shadow-none">
        <SearchField.SearchIcon className="text-fm-purple" />
        <SearchField.Input
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="text-xs font-semibold text-fm-purple placeholder:font-semibold placeholder:text-fm-purple"
        />
      </SearchField.Group>
    </SearchField>
  );
}
