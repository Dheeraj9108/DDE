import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Projects } from "./components/project/projects.tsx";
import { Dashboard } from "./components/dashboard/dashboard.tsx";
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
        path: "/group/:groupId/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/group/:groupId/projects",
        element: <Projects />,
      },
      {
        path: "/group/:groupId/projects/:projectId/flows",
        element: <Flow />,
      },
      {
        path: "/group/:groupId/projects/:projectId/flows/:id",
        element: <Canvas />,
      },
      {
        path: "/group/:groupId/team",
        element: <Teams />,
      },
      {
        path: "/group/:groupId/tickets",
        element: <TicketList />,
      },
      {
        path: "/group/:groupId/tickets/:id/:mode",
        element: <TicketInfo />,
      },
      {
        path: "/group/:groupId/flows",
        element: <FlowList />,
      },
      {
        path: "/group/:groupId/flows/:id/diagnose",
        element: <Chat />,
      },
      {
        path: "/group/:groupId/flows/:id/diagnose/:sessionId/summary",
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
