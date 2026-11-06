import { Button, Input, Label, Spinner } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.ts";

export function LoginForm() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: string } | null)?.from &&
    (location.state as { from?: string }).from !== "/"
      ? (location.state as { from: string }).from
      : "/feed";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const result = await auth.login({ email, password });
    setPending(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate(from, { replace: true });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="login-email" className="text-sm text-massa-muted">
          E-mail ou usuário
        </Label>
        <Input
          id="login-email"
          name="email"
          type="text"
          autoComplete="username"
          placeholder="seu@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          className="h-12 border-massa-border bg-[#120f0d] text-massa-text"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="login-password" className="text-sm text-massa-muted">
            Senha
          </Label>
          <button
            type="button"
            className="text-xs font-semibold text-massa-gold hover:text-massa-gold-light"
          >
            Esqueceu sua senha?
          </button>
        </div>
        <div className="relative">
          <Input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Sua senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            className="h-12 border-massa-border bg-[#120f0d] pr-12 text-massa-text"
          />
          <button
            type="button"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-massa-muted hover:text-massa-text"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        >
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        fullWidth
        isPending={pending}
        className="h-12 bg-massa-gold text-base font-bold text-[#1a100b]"
      >
        {({ isPending }) => (
          <>
            {isPending ? <Spinner color="current" size="sm" /> : null}
            {isPending ? "Entrando…" : "Entrar"}
          </>
        )}
      </Button>

      <p className="text-center text-sm text-massa-muted">
        Ainda não tem conta?{" "}
        <Link to="/signup" className="font-semibold text-massa-gold hover:text-massa-gold-light">
          Criar conta
        </Link>
      </p>
    </form>
  );
}
