'use client'
import React, { useState } from 'react'
import MuxPlayer from "@mux/mux-player-react"
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Pencil, PlusCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Chapter, MuxData } from '@prisma/client'
import FileUpload from '@/components/FileUpload'

interface Props {
  initialData: Chapter & { muxData?: MuxData | null },
  courseId: string
  chapterId: string
}
const formSchema = z.object({
  videoUrl: z.string().min(1)
})
const VideoForm = ({ initialData, courseId, chapterId }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: ""
    }
  })
  const router = useRouter()
  const [isEdit, setIsEdit] = useState(false)
  const toggleEdit = () => { setIsEdit((current) => !current) }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success("Chapter updated")
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-center">
        Chapter Video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEdit ? (
            <>Cancel</>
          ) : (
            <>
              {!initialData.videoUrl ? (<>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add an video
              </>) : (<>
                <Pencil className="h-4 w-4 mr-2" />
                Edit video
              </>)}
            </>
          )}
        </Button>
      </div>
      {!isEdit && initialData.videoUrl && (
        <div className="relative aspect-video mt-2">
          <MuxPlayer playbackId={initialData.muxData?.playbackId || ""} />
        </div>
      )}
      {isEdit ? (
        <div>
          <FileUpload onChange={(url) => {
            if (url) {
              onSubmit({ videoUrl: url })
            }
          }} endpoint='chapterVideo' />
        </div>
      ) : (
        <div className="text-xs text-muted-foreground mt-4">
          Upload this chapter's video.
        </div>
      )
      }
      {!initialData.videoUrl && !isEdit && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take time to proccess refresh the page if the video doesn't appear.
        </div>
      )}
    </div >
  )
}

export default VideoForm


