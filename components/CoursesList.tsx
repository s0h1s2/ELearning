import { CourseProgressAndCategory } from '@/types/CourseAndCategory'
import { Category, Course } from '@prisma/client'
import React from 'react'
import CourseCard from './CourseCard'

interface Props {
  items: CourseProgressAndCategory[]

}
const CoursesList = ({ items }: Props) => {
  return (
    <div >
      {items.length === 0 ? (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {items.map((item) => (
            <CourseCard key={item.id} id={item.id} title={item.title} thumbnail={item.thumbnail} chaptersLength={item.chapters.length} price={item.price} category={item?.Category?.name} />

          ))}
        </div>
      )}
    </div>
  )
}

export default CoursesList
