import { Button, Spinner } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.ts";

const fieldClass =
  "h-12 w-full rounded-xl border border-fm-purple/25 bg-fm-yellow-light px-3 text-[15px] text-black outline-none placeholder:text-black/40 focus:border-fm-purple focus:ring-2 focus:ring-fm-purple/25";

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
        <label htmlFor="login-email" className="block text-sm font-semibold text-fm-purple">
          E-mail ou usuário
        </label>
        <input
          id="login-email"
          name="email"
          type="text"
          autoComplete="username"
          placeholder="seu@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="login-password" className="block text-sm font-semibold text-fm-purple">
            Senha
          </label>
          <button
            type="button"
            className="text-xs font-bold text-fm-purple underline-offset-2 hover:underline"
          >
            Esqueceu sua senha?
          </button>
        </div>
        <div className="relative">
          <input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Sua senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={`${fieldClass} pr-12`}
          />
          <button
            type="button"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-fm-purple/70 hover:text-fm-purple"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-700/40 bg-fm-yellow-light/80 px-3 py-2 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        fullWidth
        isPending={pending}
        className="login-fm-submit h-12 bg-fm-purple text-base font-bold text-white"
      >
        {({ isPending }) => (
          <>
            {isPending ? <Spinner color="current" size="sm" /> : null}
            {isPending ? "Entrando…" : "Entrar"}
          </>
        )}
      </Button>

      <p className="text-center text-sm font-medium text-fm-purple/85">
        Ainda não tem conta?{" "}
        <Link
          to="/signup"
          className="font-extrabold text-fm-purple underline-offset-2 hover:underline"
        >
          Criar conta
        </Link>
      </p>
    </form>
  );
}
