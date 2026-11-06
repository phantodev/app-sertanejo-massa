import { Button, Spinner } from "@heroui/react";
import { ArrowLeft, Search, Users } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MobileBottomNav } from "../../navigation/components/MobileBottomNav.tsx";
import { SideNav } from "../../navigation/components/SideNav.tsx";
import { useMobileNavigation } from "../../navigation/hooks/use-mobile-navigation.ts";
import { useSideNavigation } from "../../navigation/hooks/use-side-navigation.ts";
import { useCurrentUser } from "../../session/hooks/use-current-user.ts";
import { AppShell } from "../../shell/components/AppShell.tsx";
import { useExploreGroups, useJoinExploreGroup } from "../hooks/use-group-info.ts";

export function ExploreGroupsPage() {
  const [query, setQuery] = useState("");
  const groups = useExploreGroups(query);
  const join = useJoinExploreGroup();
  const navigate = useNavigate();
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
          <header className="sticky top-0 z-10 space-y-3 border-b border-massa-border bg-fm-yellow-light/95 px-3 py-3 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Link
                to="/messages"
                aria-label="Voltar"
                className="grid size-10 place-items-center rounded-full text-massa-gold hover:bg-fm-purple/10"
              >
                <ArrowLeft className="size-5" />
              </Link>
              <h1 className="text-lg font-bold text-massa-text">Explorar grupos</h1>
            </div>
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-massa-muted" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar grupos Massa"
                className="h-10 w-full rounded-full border border-massa-border bg-fm-yellow-light py-2 pr-3 pl-10 text-sm text-massa-text outline-none placeholder:text-massa-muted focus:border-massa-gold/40"
              />
            </label>
          </header>

          <div className="px-3 py-4">
            {groups.isLoading ? (
              <div className="flex justify-center py-16 text-massa-muted">
                <Spinner color="current" size="sm" />
              </div>
            ) : null}

            {!groups.isLoading && (groups.data?.length ?? 0) === 0 ? (
              <p className="py-16 text-center text-sm text-massa-muted">Nenhum grupo encontrado.</p>
            ) : null}

            <ul className="space-y-3">
              {groups.data?.map((group) => (
                <li
                  key={group.id}
                  className="rounded-2xl border border-massa-border bg-fm-yellow-light p-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={group.avatarUrl}
                      alt=""
                      className="size-14 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-massa-text">{group.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-sm text-massa-muted">
                        {group.description}
                      </p>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-massa-muted">
                        <Users className="size-3" />
                        {group.memberCount.toLocaleString("pt-BR")} membros
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    {group.joined ? (
                      <Button
                        size="sm"
                        variant="secondary"
                        onPress={() => navigate(`/messages/${group.id}`)}
                      >
                        Abrir conversa
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-massa-gold text-[#1a100b]"
                        isPending={join.isPending}
                        onPress={() => {
                          join.mutate(group.id, {
                            onSuccess: () => navigate(`/messages/${group.id}`),
                          });
                        }}
                      >
                        Entrar
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    />
  );
}
