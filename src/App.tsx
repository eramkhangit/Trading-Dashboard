import "./App.css";
import LoginPage from './pages/Login'
import SignupPage from "./pages/SignUp";
import { Route, Router } from "wouter";
import TradingDashboard from "./pages/TradingDashboard";
import NavigationMenu from "./components/NavigationMenu";
import HomePage from "./pages/HomePage";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import ResetPasswordPage from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword"

function App() {
  return (
    <>
      <NavigationMenu />

      <Router>
        <Route path="/" component={HomePage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/resetPassword" component={ResetPasswordPage} />

        <Route path="/dashboard">
          <ProtectedRoute>
            <TradingDashboard />
          </ProtectedRoute>
        </Route>
      </Router>
    </>
  );
}

export default App;
