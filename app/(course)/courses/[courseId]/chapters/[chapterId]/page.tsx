import { getChapter } from '@/actions/GetChapter'
import Banner from '@/components/Banner'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import VideoPlayer from '../../_components/VideoPlayer'

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
    <div >
      {userProgress?.isCompleted && (
        <Banner variant="success" content="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner variant="warning" content="You need purchase this course to watch this chapter." />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            courseId={params.courseId}
            title={chapter.title}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd} />

        </div>
      </div>
    </div>
  )
}

export default ChapterIdPage  
