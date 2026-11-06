import { Spinner } from "@heroui/react";
import { ArrowLeft, Crown } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { MobileBottomNav } from "../../navigation/components/MobileBottomNav.tsx";
import { SideNav } from "../../navigation/components/SideNav.tsx";
import { useMobileNavigation } from "../../navigation/hooks/use-mobile-navigation.ts";
import { useSideNavigation } from "../../navigation/hooks/use-side-navigation.ts";
import { useCurrentUser } from "../../session/hooks/use-current-user.ts";
import { AppShell } from "../../shell/components/AppShell.tsx";
import { useGroupInfo } from "../hooks/use-group-info.ts";

export function GroupInfoPage() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const info = useGroupInfo(conversationId);
  const currentUser = useCurrentUser();
  const sideNav = useSideNavigation();
  const mobileNav = useMobileNavigation();

  if (!currentUser.data || !sideNav.data || !mobileNav.data) {
    return (
      <div className="grid min-h-dvh place-items-center bg-massa-bg text-sm text-massa-muted">
        Carregando…
      </div>
    );
  }

  return (
    <AppShell
      sideNav={
        <SideNav
          items={sideNav.data.items}
          publish={sideNav.data.publish}
          user={currentUser.data}
        />
      }
      bottomNav={<MobileBottomNav items={mobileNav.data} />}
      main={
        <div className="min-h-dvh bg-fm-yellow-light">
          <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-massa-border bg-fm-yellow-light/95 px-2 py-2 backdrop-blur-md">
            <Link
              to={`/messages/${conversationId}`}
              aria-label="Voltar ao chat"
              className="grid size-10 place-items-center rounded-full text-massa-gold hover:bg-fm-purple/10"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <h1 className="text-lg font-bold text-massa-text">Dados do grupo</h1>
          </header>

          {info.isLoading ? (
            <div className="flex justify-center py-16 text-massa-muted">
              <Spinner color="current" size="sm" />
            </div>
          ) : null}

          {info.isError || !info.data ? (
            <p className="px-4 py-16 text-center text-sm text-massa-muted">Grupo não encontrado.</p>
          ) : (
            <div className="space-y-6 px-4 py-6">
              <div className="flex flex-col items-center gap-3 text-center">
                <img
                  src={info.data.avatarUrl}
                  alt=""
                  className="size-28 rounded-full object-cover ring-2 ring-massa-gold/30"
                />
                <div>
                  <h2 className="text-2xl font-bold text-massa-text">{info.data.title}</h2>
                  <p className="mt-1 text-sm text-massa-muted">
                    Grupo · {info.data.memberCount} membros
                  </p>
                </div>
              </div>

              <section className="rounded-2xl border border-massa-border bg-fm-yellow-light p-4">
                <h3 className="text-sm font-semibold text-massa-gold">Descrição</h3>
                <p className="mt-2 text-sm leading-relaxed text-massa-text">
                  {info.data.description || "Sem descrição."}
                </p>
              </section>

              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-massa-text">
                    {info.data.memberCount} membros
                  </h3>
                  <Link
                    to="/messages/explore"
                    className="text-sm font-semibold text-massa-gold hover:underline"
                  >
                    Explorar grupos
                  </Link>
                </div>
                <ul className="divide-y divide-massa-border/60 overflow-hidden rounded-2xl border border-massa-border bg-fm-yellow-light">
                  {info.data.members.map((member) => (
                    <li key={member.id}>
                      <Link
                        to={`/${member.handle}`}
                        className="flex items-center gap-3 px-3 py-3 transition hover:bg-fm-purple/10"
                      >
                        <img
                          src={member.avatarUrl}
                          alt=""
                          className="size-11 rounded-full object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold text-massa-text">
                            {member.displayName}
                          </p>
                          <p className="truncate text-xs text-massa-muted">@{member.handle}</p>
                        </div>
                        {member.role === "admin" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-massa-gold/15 px-2 py-0.5 text-[10px] font-bold text-massa-gold">
                            <Crown className="size-3" />
                            Admin
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </div>
      }
    />
  );
}
