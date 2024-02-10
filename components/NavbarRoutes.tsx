"use client"
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import { LogOut, Presentation, Projector } from 'lucide-react'
import Link from 'next/link'
import SearchInput from './SearchInput'
const NavbarRoutes = () => {
  const pathName = usePathname()
  const isTeacherMode = pathName.startsWith("/teacher/")
  const isPlayerMode = pathName.startsWith("/chapter/")
  const isSearchPage = pathName.startsWith("/search")
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherMode || isPlayerMode ? (
          <Link href="/">
            <Button variant="ghost">
              <LogOut />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost" >
              <Presentation />
              Teacher Mode
            </Button>
          </Link>
        )}

        <UserButton afterSignOutUrl='/' />
      </div>
    </>
  )
}

export default NavbarRoutes
