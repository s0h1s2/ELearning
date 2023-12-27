import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
interface Props {
  icon: LucideIcon,
  label: string,
  href: string,

}


const SidebarItem = ({ route }: { route: Props }) => {
  const Icon = route.icon
  const router = useRouter()
  const pathName = usePathname()
  const isActive = (pathName == '/' && route.href == '/') || pathName == route.href
    ||
    pathName?.startsWith(`${route.href}/`)

  return (
    <button onClick={() => router.replace(route.href)} type="button" className={cn(
      " flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
      isActive && "text-sky-700 bg-sky-200 hover:bg-sky-200/20 hover:text-sky-700"
    )}>
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className={cn("text-slate-500", isActive && "text-sky-700")} />
        {route.label}
      </div>
    </button>
  )
}

export default SidebarItem
