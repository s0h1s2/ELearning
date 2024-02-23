import { getDashboardCourses } from '@/actions/GetDashboardCourses'
import CoursesList from '@/components/CoursesList'
import { auth } from '@clerk/nextjs'
import { CheckCircle, Clock } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import InfoCard from './_components/InfoCard'

const Home = async () => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/")
  }
  const { coursesInProgress, completedCourses } = await getDashboardCourses(userId)
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard icon={Clock} label="In progress" numberOfItems={coursesInProgress.length} />
        <InfoCard variant="success" icon={CheckCircle} label="Completed Courses" numberOfItems={completedCourses.length} />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  )
}

export default Home
