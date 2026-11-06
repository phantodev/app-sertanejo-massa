import { BrandLogo } from "../../../shared/ui/BrandLogo.tsx";

/** Painel esquerdo — roxo oficial + bubbles */
export function LoginHeroPanel() {
  return (
    <aside className="relative hidden min-h-dvh overflow-hidden bg-fm-purple lg:flex lg:w-[48%] xl:w-[52%]">
      <img
        aria-hidden
        src="/assets/bg-purple-bubbles.png"
        alt=""
        className="absolute inset-0 size-full object-cover opacity-50"
      />

      <div className="relative z-10 flex w-full flex-col justify-between px-10 py-10 xl:px-14">
        <div className="inline-flex w-fit rounded-2xl bg-fm-yellow-light px-4 py-3">
          <BrandLogo href="/" variant="transparent" />
        </div>

        <div className="max-w-md space-y-5">
          <p className="inline-flex rounded-full bg-fm-yellow-light px-3 py-1 text-[10px] font-extrabold tracking-[0.14em] text-fm-purple">
            QUEM JÁ ESTÁ AQUI
          </p>
          <blockquote className="text-[28px] font-semibold leading-snug tracking-tight text-white xl:text-[32px]">
            “O sertanejo não é só música — é mesa posta, estrada e gente que sente o mesmo verso.”
          </blockquote>
          <div>
            <p className="text-sm font-semibold text-fm-yellow">Comunidade Massa</p>
            <p className="text-sm text-white/75">Fãs, artistas e noites que ficam</p>
          </div>
        </div>

        <p className="text-xs text-white/55">
          © {new Date().getFullYear()} Sertanejo Massa. Todos os direitos reservados.
        </p>
      </div>
    </aside>
  );
}
