import { BrandLogo } from "../../../shared/ui/BrandLogo.tsx";
import { LoginForm } from "./LoginForm.tsx";
import { LoginHeroPanel } from "./LoginHeroPanel.tsx";

export function LoginPage() {
  return (
    <div className="flex min-h-dvh bg-massa-bg text-massa-text">
      <LoginHeroPanel />

      <main className="relative flex min-h-dvh flex-1 items-center justify-center px-5 py-10 sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, rgba(14,12,11,0.55), rgba(14,12,11,0.94)),
              url(/assets/banner.webp)
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 w-full max-w-md space-y-8">
          <div className="lg:hidden">
            <BrandLogo href="/" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-massa-text sm:text-[34px]">
              Entre na sua conta
            </h1>
            <p className="text-sm text-massa-muted">
              Entre com o e-mail da sua conta Massa e continue perto do som.
            </p>
          </div>

          <LoginForm />
        </div>
      </main>
    </div>
  );
}
