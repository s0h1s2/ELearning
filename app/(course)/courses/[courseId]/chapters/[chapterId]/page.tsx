import { getChapter } from '@/actions/GetChapter'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const ChapterIdPage = async ({ params }: { params: { courseId: string, chapterId: string } }) => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/")
  }
  const { chapter, course, userProgress, muxData, attachments, nextChapter, purchase } = await getChapter({ userId: userId, chapterId: params.chapterId, courseId: params.courseId })
  if (!chapter || !course) {
    return redirect("/")
  }
  const isLocked = !chapter.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted

  return (
    <div>

    </div>
  )
}

export default ChapterIdPage  
