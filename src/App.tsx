import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { EventDetailPage } from "./features/events/components/EventDetailPage.tsx";
import { EventPlaceholderPage } from "./features/events/components/EventPlaceholderPage.tsx";
import { EventsPage } from "./features/events/components/EventsPage.tsx";
import { FeedPage } from "./features/feed/components/FeedPage.tsx";
import { ProfilePage } from "./features/profile/components/ProfilePage.tsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedPage />} />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
