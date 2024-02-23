"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { CheckCircle, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
interface Props {
  courseId: string
  chapterId: string
  nextChapterId?: string
  isCompleted?: boolean
}
const CourseProgressButton = ({ courseId, chapterId, nextChapterId, isCompleted }: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const Icon = isCompleted ? XCircle : CheckCircle
  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, { isCompleted: !isCompleted })
      if (isCompleted && !nextChapterId) {
        toast.success("Course completed successfully");
        return;
      }
      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
      }
      router.refresh()
      toast.success("Progress updated");
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button disabled={isLoading} onClick={onClick} className="w-full md:w-auto" type="button" variant={isCompleted ? "outline" : "success"}>
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  )
}

export default CourseProgressButton
