import { Link } from "react-router-dom";
import { MobileBottomNav } from "../../navigation/components/MobileBottomNav.tsx";
import { SideNav } from "../../navigation/components/SideNav.tsx";
import { useMobileNavigation } from "../../navigation/hooks/use-mobile-navigation.ts";
import { useSideNavigation } from "../../navigation/hooks/use-side-navigation.ts";
import { useCurrentUser } from "../../session/hooks/use-current-user.ts";
import { AppShell } from "../../shell/components/AppShell.tsx";
import { EventsMobileBar } from "./EventsMobileBar.tsx";

type EventPlaceholderPageProps = {
  title: string;
  description: string;
};

export function EventPlaceholderPage({ title, description }: EventPlaceholderPageProps) {
  const currentUser = useCurrentUser();
  const sideNav = useSideNavigation();
  const mobileNav = useMobileNavigation();

  if (!currentUser.data || !sideNav.data || !mobileNav.data) {
    return null;
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
        <>
          <EventsMobileBar title={title} />
          <div className="space-y-4 px-6 py-16 text-center">
            <p className="text-lg font-semibold text-massa-text">{title}</p>
            <p className="text-sm text-massa-muted">{description}</p>
            <Link
              to="/events"
              className="inline-flex h-10 items-center justify-center rounded-full bg-massa-gold px-5 text-sm font-semibold text-[#1a100b]"
            >
              Voltar aos eventos
            </Link>
          </div>
        </>
      }
    />
  );
}
