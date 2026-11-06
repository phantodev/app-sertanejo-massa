import { BrandLogo } from "../../../shared/ui/BrandLogo.tsx";
import { LoginForm } from "./LoginForm.tsx";
import { LoginHeroPanel } from "./LoginHeroPanel.tsx";

/** Login teste — paleta oficial Massa FM (`fm-*`) */
export function LoginPage() {
  return (
    <div className="login-massa-fm flex min-h-dvh bg-fm-yellow-light text-fm-purple">
      <LoginHeroPanel />

      <main className="relative flex min-h-dvh flex-1 items-center justify-center px-5 py-10 sm:px-8">
        <div className="relative z-10 w-full max-w-md space-y-8">
          <div className="lg:hidden">
            <BrandLogo href="/" variant="transparent" />
          </div>

          <div className="space-y-2">
            <p className="inline-flex rounded-full bg-fm-purple px-3 py-1 text-[10px] font-extrabold tracking-[0.14em] text-white">
              ENTRAR
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-fm-purple sm:text-[34px]">
              Entre na sua conta
            </h1>
            <p className="text-sm font-medium text-fm-purple/80">
              Entre com o e-mail da sua conta Massa e continue perto do som.
            </p>
          </div>

          <LoginForm />
        </div>
      </main>
    </div>
  );
}
