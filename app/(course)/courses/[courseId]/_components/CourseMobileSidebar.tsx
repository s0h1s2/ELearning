import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CourseChaptersProgress } from '@/types/CourseChaptersAndProgress'
import { Menu } from 'lucide-react'
import React from 'react'
import CourseSidebar from './CourseSidebar'
interface Props {
  course: CourseChaptersProgress,
  progressCount: number
}
const CourseMobileSidebar = ({ course, progressCount }: Props) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  )
}

export default CourseMobileSidebar
