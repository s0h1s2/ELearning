import IconBadge from '@/components/IconBadge'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import ChapterTitleForm from './_components/TitleForm'
import ChapterDescriptionForm from './_components/ChapterDescriptionForm'
import ChapterAccessForm from './_components/ChapterAccessForm'
import VideoForm from './_components/VideoForm'

const ChapterId = async ({ params }: { params: { courseId: string, chapterId: string } }) => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/")
  }
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true
    }
  })
  if (!chapter) {
    return redirect("/")
  }
  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl,
  ]
  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completetionText = `(${completedFields}/${totalFields})`
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link href={`/teacher/courses/${params.courseId}`} className="flex items-center text-sm hover:opacity-75 transition mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to course setup
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">
                Chapter Creation
              </h1>
              <span className="text-sm text-slate-700">
                Complete All Fields {completetionText}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Customize your chapter
              </h2>
            </div>
          </div>
          <ChapterTitleForm courseId={params.courseId} chapterId={params.chapterId} initialData={chapter} />
          <ChapterDescriptionForm courseId={params.courseId} chapterId={params.chapterId} initialData={chapter} />
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Eye} />
            <h2 className="text-xl">
              Access Settings
            </h2>
          </div>
          <ChapterAccessForm courseId={params.courseId} chapterId={params.chapterId} initialData={chapter} />
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Video} />
            <h2 className="text-xl">
              Video
            </h2>
          </div>
          <VideoForm initialData={chapter} courseId={params.courseId} chapterId={params.chapterId} />
        </div>
      </div>
    </div>

  )
}

export default ChapterId  
