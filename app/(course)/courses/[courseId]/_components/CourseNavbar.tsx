import { CourseChaptersProgress } from '@/types/CourseChaptersAndProgress'
import NavbarRoutes from '@/components/NavbarRoutes'
import React from 'react'
import CourseMobileSidebar from './CourseMobileSidebar'
interface Props {
  course: CourseChaptersProgress
  progressCount: number
}
const CourseNavbar = ({ course, progressCount }: Props) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  )
}

export default CourseNavbar
