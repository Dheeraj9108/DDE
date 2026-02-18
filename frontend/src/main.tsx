import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Projects } from "./components/project/projects.tsx";
import { Dashboard } from "./components/dashbord.tsx";
import { Flow } from "./components/flow/flow-list/flow.tsx";
import { Teams } from "./components/team/team.tsx";
import { Canvas } from "./components/flow/canvas/canvas.tsx";
import { Login } from "./components/login/login.tsx";
import { Signup } from "./components/signup/signup.tsx";
import { TicketList } from "./components/ticket/ticket-list.tsx";
import { TicketInfo } from "./components/ticket/ticket-info.tsx";
import { Chat } from "./components/chat/components/chat.tsx";
import { FlowList } from "./components/chat/components/flow-list.tsx";
import { DiagnosisSummary } from "./components/chat/components/diagnosis-summary.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import PublicRoute from "./PublicRoute.tsx";
import AuthProvider from "./AuthProvider.tsx";
import Home from "./components/home/home.tsx";
import { Join } from "./components/join/join.tsx";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/join",
        element: <Join />,
      },
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/:projectId/flows",
        element: <Flow />,
      },
      {
        path: "/projects/:projectId/flows/:id",
        element: <Canvas />,
      },
      {
        path: "/team",
        element: <Teams />,
      },
      {
        path: "/tickets",
        element: <TicketList />,
      },
      {
        path: "/tickets/:id/:mode",
        element: <TicketInfo />,
      },
      {
        path: "/flows",
        element: <FlowList />,
      },
      {
        path: "/flows/:id/diagnose",
        element: <Chat />,
      },
      {
        path: "/flows/:id/diagnose/:sessionId/summary",
        element: <DiagnosisSummary />,
      }
    ],
  }
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
