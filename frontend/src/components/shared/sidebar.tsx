import * as React from "react"
import {
  IconDashboard,
  IconUsers,
  IconFolder,
  IconTicket,
  IconMessage
} from "@tabler/icons-react"
import { NavMain } from "@/components/shared/navbar/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Dheeraj",
    email: "dheeraj@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Projects",
      url: "projects",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "/team",
      icon: IconUsers,
    },
    {
      title: "Tickets",
      url: "/ticket",
      icon: IconTicket,
    },
    {
      title: "Guided Chat",
      url: "/flows",
      icon: IconMessage,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props} collapsible="icon" style={{ background: "#020617" }} className="[&_[data-sidebar=sidebar]]:bg-[#272429]/60
    [&_[data-sidebar=sidebar]]:backdrop-blur-sm">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                {/* <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div> */}
              
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <svg width="120" height="38" viewBox="0 0 220 48" xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="34"
                      font-family="Inter, Arial, sans-serif"
                      font-size="32"
                      font-weight="600"
                      // fill="#1E40AF">
                      fill="#714f71">
                      Guide<tspan fill="#14B8A6">Dx</tspan>
                    </text>
                  </svg>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
