"use client"
import ConfirmModal from '@/components/modals/ConfirmModal'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
interface Props {
  courseId: string
  chapterId: string
  isPublished: boolean
  disabled: boolean

}
const ChapterActions = ({ courseId, chapterId, isPublished, disabled }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
      toast.success("Chapter Deleted successfully");
      router.refresh()
      router.push(`/teacher/courses/${courseId}`)
    } catch (error) {
      toast.error("Something went wrong")

    } finally {
      setIsLoading(false);
    }
  }
  async function chapterVisiableActions() {
    try {
      setIsLoading(true);
      if (!isPublished) {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
        toast.success("Chapter Unpublished successfully");
      } else {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
        toast.success("Chapter Published successfully");
      }
      router.refresh()
      router.push(`/teacher/courses/${courseId}`)
    } catch (error) {
      toast.error("Something went wrong")

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={chapterVisiableActions} disabled={disabled || isLoading} variant="outline" size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" variant="destructive" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}

export default ChapterActions
