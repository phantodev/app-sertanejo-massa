import { BrandLogo } from "../../../shared/ui/BrandLogo.tsx";

export function LoginHeroPanel() {
  return (
    <aside className="relative hidden min-h-dvh overflow-hidden lg:flex lg:w-[48%] xl:w-[52%]">
      <img
        src="/assets/hero.webp"
        alt=""
        className="absolute inset-0 size-full object-cover object-[center_42%]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e0c0b]/35 via-[#0e0c0b]/72 to-[#0e0c0b]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(233,179,111,0.22),_transparent_55%)]" />

      <div className="relative z-10 flex w-full flex-col justify-between px-10 py-10 xl:px-14">
        <BrandLogo href="/" />

        <div className="max-w-md space-y-5">
          <p className="text-[11px] font-extrabold tracking-[0.16em] text-massa-gold/85">
            QUEM JÁ ESTÁ AQUI
          </p>
          <blockquote className="text-[28px] font-semibold leading-snug tracking-tight text-massa-text xl:text-[32px]">
            “O sertanejo não é só música — é mesa posta, estrada e gente que sente o mesmo verso.”
          </blockquote>
          <div>
            <p className="text-sm font-semibold text-massa-text">Comunidade Massa</p>
            <p className="text-sm text-massa-muted">Fãs, artistas e noites que ficam</p>
          </div>
        </div>

        <p className="text-xs text-massa-muted/80">
          © {new Date().getFullYear()} Sertanejo Massa. Todos os direitos reservados.
        </p>
      </div>
    </aside>
  );
}
