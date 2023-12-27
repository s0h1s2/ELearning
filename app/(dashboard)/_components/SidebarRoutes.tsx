"use client"
import { Compass, Layout } from 'lucide-react'
import React from 'react'
import SidebarItem from './SidebarItem'
const guestRoutes = [{ icon: Layout, label: "Dashboard", href: "/" }, { icon: Compass, label: "Browse", href: "/search" }]
const SidebarRoutes = () => {
  const routes = guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => {
        return (<SidebarItem key={route.label} route={route} />);
      })}

    </div>
  )
}

export default SidebarRoutes
