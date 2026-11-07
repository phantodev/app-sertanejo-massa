import { Spinner } from "@heroui/react";
import { Bell } from "lucide-react";
import { MobileBottomNav } from "../../navigation/components/MobileBottomNav.tsx";
import { SideNav } from "../../navigation/components/SideNav.tsx";
import { useMobileNavigation } from "../../navigation/hooks/use-mobile-navigation.ts";
import { useSideNavigation } from "../../navigation/hooks/use-side-navigation.ts";
import { useCurrentUser } from "../../session/hooks/use-current-user.ts";
import { AppShell } from "../../shell/components/AppShell.tsx";
import { SuggestionsPanel } from "../../suggestions/components/SuggestionsPanel.tsx";
import { useSuggestions } from "../../suggestions/hooks/use-suggestions.ts";
import { useNotificationSections, useRespondToFriendRequest } from "../hooks/use-notifications.ts";
import type { FriendRequestNotification, Notification } from "../types/notifications.types.ts";
import { EventInviteItem } from "./EventInviteItem.tsx";
import { FriendRequestItem } from "./FriendRequestItem.tsx";
import { NotificationsMobileBar } from "./NotificationsMobileBar.tsx";

function isFriendRequest(notification: Notification): notification is FriendRequestNotification {
  return notification.kind === "friend-request";
}

export function NotificationsPage() {
  const currentUser = useCurrentUser();
  const sideNav = useSideNavigation();
  const mobileNav = useMobileNavigation();
  const suggestions = useSuggestions();
  const sections = useNotificationSections();
  const respond = useRespondToFriendRequest();

  const booting = currentUser.isLoading || sideNav.isLoading || mobileNav.isLoading;
  if (booting || !currentUser.data || !sideNav.data || !mobileNav.data) {
    return (
      <div className="grid min-h-dvh place-items-center bg-massa-bg text-massa-muted">
        <div className="flex items-center gap-3 text-sm font-semibold">
          <Spinner color="current" size="sm" />
          Carregando notificações…
        </div>
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
      rightRail={<SuggestionsPanel suggestions={suggestions.data ?? []} />}
      bottomNav={<MobileBottomNav items={mobileNav.data} />}
      main={
        <>
          <NotificationsMobileBar />
          <header className="hidden border-b border-massa-border px-4 py-4 lg:block">
            <h1 className="text-xl font-bold tracking-tight text-massa-text">Notificações</h1>
          </header>

          {sections.isLoading ? (
            <div className="flex justify-center py-16 text-massa-muted">
              <Spinner color="current" size="sm" />
            </div>
          ) : null}

          {sections.isError ? (
            <div className="px-6 py-12 text-center" role="alert">
              <p className="text-base font-semibold text-fm-purple">
                Não foi possível carregar as notificações.
              </p>
              <p className="mt-1 text-xs font-semibold text-massa-muted">
                Tente novamente em instantes.
              </p>
            </div>
          ) : null}

          {!sections.isLoading && !sections.isError && (sections.data?.length ?? 0) === 0 ? (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <span className="grid size-14 place-items-center rounded-2xl bg-fm-purple/10 text-fm-purple">
                <Bell aria-hidden="true" className="size-6" />
              </span>
              <h2 className="mt-4 text-base font-bold text-fm-purple">Você está em dia</h2>
              <p className="mt-1 max-w-xs text-xs font-semibold text-massa-muted">
                Quando chegar uma solicitação ou convite, ele aparece aqui.
              </p>
            </div>
          ) : null}

          {sections.data?.map((section) => (
            <section
              key={section.id}
              aria-labelledby={`notifications-${section.id}`}
              className={section.id === "friend-requests" ? "border-b border-massa-border/60" : ""}
            >
              <h2
                id={`notifications-${section.id}`}
                className="px-4 pb-3 text-[14px] font-bold text-fm-purple"
                style={{ paddingTop: 24 }}
              >
                {section.title}
              </h2>
              <ul className="divide-y divide-massa-border/60">
                {section.notifications.map((notification) =>
                  isFriendRequest(notification) ? (
                    <FriendRequestItem
                      key={notification.id}
                      notification={notification}
                      isPending={respond.isPending && respond.variables?.id === notification.id}
                      onRespond={(id, response) => respond.mutate({ id, response })}
                    />
                  ) : (
                    <EventInviteItem key={notification.id} notification={notification} />
                  ),
                )}
              </ul>
            </section>
          ))}
        </>
      }
    />
  );
}
