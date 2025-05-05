import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CadastroPage from "./pages/CadastroPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EmailLoginConfirmPage from "./pages/EmailConfirmPage.jsx";
import EmailPerfilConfirmPage from "./pages/EmailProfileConfirmPage.jsx";
import EmailSignConfirmPage from "./pages/EmailSignConfirmPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cadastro",
    element: <CadastroPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/confirmacao-email-login",
    element: <EmailLoginConfirmPage />,
  },
  {
    path: "/confirmacao-email-perfil",
    element: <EmailPerfilConfirmPage />,
  },
  {
    path: "/confirmacao-email-sign",
    element: <EmailSignConfirmPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
