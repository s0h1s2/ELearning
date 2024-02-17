import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

const CourseIdView = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    },
    include: {
      chapters: {
        where: {
          isPublished: true
        },
        orderBy: {
          position: "asc"
        }
      },
    }
  })
  if (!course) {
    return redirect("/")
  }
  return redirect(`/courses/${params.courseId}/chapters/${course.chapters.at(0)?.id}`)
}

export default CourseIdView 
