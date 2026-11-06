import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FeedPage } from "./features/feed/components/FeedPage.tsx";
import { ProfilePage } from "./features/profile/components/ProfilePage.tsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/:handle" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
