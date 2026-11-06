import { useParams } from "react-router-dom";
import { MobileBottomNav } from "../../navigation/components/MobileBottomNav.tsx";
import { SideNav } from "../../navigation/components/SideNav.tsx";
import { useMobileNavigation } from "../../navigation/hooks/use-mobile-navigation.ts";
import { useSideNavigation } from "../../navigation/hooks/use-side-navigation.ts";
import { useCurrentUser } from "../../session/hooks/use-current-user.ts";
import { AppShell } from "../../shell/components/AppShell.tsx";
import { ChatEmptyState } from "./ChatEmptyState.tsx";
import { ChatPanel } from "./ChatPanel.tsx";
import { ConversationList } from "./ConversationList.tsx";

export function MessagesPage() {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const hasChat = Boolean(conversationId);

  const currentUser = useCurrentUser();
  const sideNav = useSideNavigation();
  const mobileNav = useMobileNavigation();

  if (!currentUser.data || !sideNav.data || !mobileNav.data) {
    return (
      <div className="grid min-h-dvh place-items-center bg-massa-bg text-sm text-massa-muted">
        Carregando mensagens…
      </div>
    );
  }

  return (
    <AppShell
      stretchMain
      sideNav={
        <SideNav
          items={sideNav.data.items}
          publish={sideNav.data.publish}
          user={currentUser.data}
        />
      }
      bottomNav={<MobileBottomNav items={mobileNav.data} />}
      main={
        <div className="grid h-full min-h-0 w-full flex-1 overflow-hidden lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
          <div
            className={`min-h-0 min-w-0 overflow-hidden ${hasChat ? "hidden lg:block" : "block"}`}
          >
            <ConversationList className="h-full w-full" />
          </div>

          <div
            className={`min-h-0 min-w-0 overflow-hidden ${hasChat ? "block" : "hidden lg:block"}`}
          >
            {conversationId ? <ChatPanel conversationId={conversationId} /> : <ChatEmptyState />}
          </div>
        </div>
      }
    />
  );
}
