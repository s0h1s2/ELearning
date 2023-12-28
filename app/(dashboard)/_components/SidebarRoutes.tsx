"use client"
import { BarChart, Compass, Layout, List } from 'lucide-react'
import React from 'react'
import SidebarItem from './SidebarItem'
import { usePathname } from 'next/navigation'
const guestRoutes = [{ icon: Layout, label: "Dashboard", href: "/" }, { icon: Compass, label: "Browse", href: "/search" }]
const teacherRoutes = [{ icon: List, label: "Courses", href: "/teacher/courses" }, { icon: BarChart, label: "Analytics", href: "/teacher/analytics" }]
const SidebarRoutes = () => {
  const pathName = usePathname()
  const routes = pathName.startsWith("/teacher/") ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => {
        return (<SidebarItem key={route.label} route={route} />);
      })}

    </div>
  )
}

export default SidebarRoutes
