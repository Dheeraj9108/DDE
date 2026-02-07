import { AppSidebar } from "@/components/shared/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theam-provider";
import { useState } from "react";

export default function PrivateLayout() {
    const [open, setOpen] = useState(false);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider open={open} onOpenChange={setOpen}>
                <AppSidebar />
                <SidebarInset style={{background:"#020617"}}>
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
            <Toaster />
        </ThemeProvider>
    )
}