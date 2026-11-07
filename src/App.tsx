import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GuestOnly } from "./features/auth/components/GuestOnly.tsx";
import { LoginPage } from "./features/auth/components/LoginPage.tsx";
import { RequireAuth } from "./features/auth/components/RequireAuth.tsx";
import { AuthProvider } from "./features/auth/context/AuthProvider.tsx";
import { EventDetailPage } from "./features/events/components/EventDetailPage.tsx";
import { EventPlaceholderPage } from "./features/events/components/EventPlaceholderPage.tsx";
import { EventsPage } from "./features/events/components/EventsPage.tsx";
import { FeedPage } from "./features/feed/components/FeedPage.tsx";
import { ExploreGroupsPage } from "./features/messages/components/ExploreGroupsPage.tsx";
import { GroupInfoPage } from "./features/messages/components/GroupInfoPage.tsx";
import { MessagesPage } from "./features/messages/components/MessagesPage.tsx";
import { MenuPage } from "./features/menu/components/MenuPage.tsx";
import { MenuPlaceholderPage } from "./features/menu/components/MenuPlaceholderPage.tsx";
import { NotificationsPage } from "./features/notifications/components/NotificationsPage.tsx";
import { ProfilePage } from "./features/profile/components/ProfilePage.tsx";
import { TopHitsPage } from "./features/top-hits/components/TopHitsPage.tsx";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<GuestOnly />}>
            <Route path="/" element={<LoginPage />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/messages/explore" element={<ExploreGroupsPage />} />
            <Route path="/messages/:conversationId/info" element={<GroupInfoPage />} />
            <Route path="/messages/:conversationId" element={<MessagesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/menu/:feature" element={<MenuPlaceholderPage />} />
            <Route path="/top-hits" element={<TopHitsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route
              path="/events/create"
              element={
                <EventPlaceholderPage
                  title="Criar evento"
                  description="A criação de eventos entra na próxima leva. Por enquanto explore a agenda Massa."
                />
              }
            />
            <Route
              path="/events/my"
              element={
                <EventPlaceholderPage
                  title="Meus eventos"
                  description="Em breve você vê aqui os roles que marcou presença e os que organizou."
                />
              }
            />
            <Route path="/events/:eventId" element={<EventDetailPage />} />
            <Route path="/:handle" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
