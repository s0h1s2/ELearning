import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { DataTable } from './_components/DataTable'
import { columns } from './_components/Columns'

const TeacherCourses = async () => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/")
  }
  const courses = await db.course.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <div className="p-6">
      <Link href="/teacher/create">
        <Button>
          New Course
        </Button>
      </Link>
      <DataTable data={courses} columns={columns} />
    </div>
  )
}

export default TeacherCourses 
