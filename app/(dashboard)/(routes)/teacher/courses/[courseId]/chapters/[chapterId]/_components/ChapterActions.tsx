"use client"
import ConfirmModal from '@/components/modals/ConfirmModal'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import React from 'react'
interface Props {
  courseId: string
  chapterId: string
  isPublished: boolean
  disabled: boolean

}

const ChapterActions = ({ courseId, chapterId, isPublished, disabled }: Props) => {
  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={() => { }} disabled={disabled} variant="outline" size="sm">
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={() => { }}>
        <Button size="sm" variant="destructive">
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}

export default ChapterActions
