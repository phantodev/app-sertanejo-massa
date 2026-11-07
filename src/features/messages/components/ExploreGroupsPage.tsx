import { Button, Spinner } from "@heroui/react";
import { ArrowLeft, Users } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MassaSearchField } from "../../../shared/ui/MassaSearchField.tsx";
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
      <div className="grid min-h-dvh place-items-center bg-massa-bg text-xs font-semibold text-massa-muted">
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
                className="grid size-10 place-items-center rounded-full text-fm-blue hover:bg-fm-purple/10"
              >
                <ArrowLeft className="size-5" />
              </Link>
              <h1 className="text-lg font-bold text-massa-text">Explorar grupos</h1>
            </div>
            <MassaSearchField
              aria-label="Buscar grupos Massa"
              placeholder="Buscar grupos Massa"
              value={query}
              onChange={setQuery}
            />
          </header>

          <div className="px-3 py-4">
            {groups.isLoading ? (
              <div className="flex justify-center py-16 text-massa-muted">
                <Spinner color="current" size="sm" />
              </div>
            ) : null}

            {!groups.isLoading && (groups.data?.length ?? 0) === 0 ? (
              <p className="py-16 text-center text-xs font-semibold text-massa-muted">
                Nenhum grupo encontrado.
              </p>
            ) : null}

            <ul className="space-y-3">
              {groups.data?.map((group) => (
                <li key={group.id} className="rounded-xl bg-fm-yellow p-3">
                  <div className="flex gap-3">
                    <img
                      src={group.avatarUrl}
                      alt=""
                      className="size-14 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-black text-massa-text">{group.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs font-semibold text-massa-muted">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <div className="flex max-w-full items-center gap-3">
                      <p className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-fm-blue">
                        <Users className="size-3.5 shrink-0 text-fm-blue" aria-hidden />
                        {group.memberCount.toLocaleString("pt-BR")} membros
                      </p>
                      {group.joined ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="shrink-0"
                          onPress={() => navigate(`/messages/${group.id}`)}
                        >
                          Abrir conversa
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="shrink-0 bg-massa-gold text-[#1a100b]"
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
