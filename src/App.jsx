import "./App.css";
import AppLayout from "./layout/AppLayout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NewUser from "./pages/NewUser";
import LoggedUser from "./pages/LoggedUser";
import { useState } from "react";
import Moments from "./pages/Moments";
import NewAccount from "./pages/CreateAccount";
import Discover from "./pages/Discover";
import CommunityPage from "./pages/Community";
import ProfileSettings from "./pages/ProfileSettings";
import CommunityDetail from "./pages/CommunityDetail";
import AuthProviderWithNavigate from "./Context/AuthContextWrapper";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <AuthProviderWithNavigate>
        <AppLayout>
          <Routes>
            <Route path="/" element={<NewUser />} />
            <Route
              path="/user/profile-settings"
              element={
                <ProtectedRoute>
                  <ProfileSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <LoggedUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/Moments"
              element={
                <ProtectedRoute>
                  <Moments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/Discover"
              element={
                <ProtectedRoute>
                  <Discover />
                </ProtectedRoute>
              }
            />
            <Route path="/Communities" element={<CommunityPage />} />
            <Route
              path="user/Communities/:communityId"
              element={
                <ProtectedRoute>
                  <CommunityDetail />
                </ProtectedRoute>
              }
            />
            <Route path="/create-account" element={<NewAccount />} />
          </Routes>
        </AppLayout>
      </AuthProviderWithNavigate>
    </Router>
  );
}

export default App;
