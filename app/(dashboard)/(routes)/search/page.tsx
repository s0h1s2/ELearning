import { db } from '@/lib/db'
import React from 'react'
import Categories from './components/Categories'
import SearchInput from '@/components/SearchInput'
import { getCourses } from '@/actions/GetCourses'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import CoursesList from '@/components/CoursesList'
interface Props {
  searchParams: {
    title: string,
    categoryId: string
  }
}
const SearchPage = async ({ searchParams }: Props) => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/")
  }
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })
  const courses = await getCourses({ userId: userId, ...searchParams })
  return (
    <>
      {/* For small devices only*/}
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories categories={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  )
}

export default SearchPage
