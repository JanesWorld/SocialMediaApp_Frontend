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
import UserTimeline from "./pages/UserTimeline";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const logIn = () => setIsAuthenticated(true);
  const logOut = () => setIsAuthenticated(false);
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<NewUser />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <LoggedUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/Timeline"
            element={
              <ProtectedRoute>
                <UserTimeline />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
