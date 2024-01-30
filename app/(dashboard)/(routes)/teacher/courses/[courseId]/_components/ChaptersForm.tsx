'use client'
import React, { useState } from 'react'
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Loader2, PlusCircle } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Chapter, Course } from '@prisma/client'
import { Input } from '@/components/ui/input'
import ChapterList from './ChapterList'
interface Props {
  initialData: Course & { chapters: Chapter[] },
  courseId: string
}
const formSchema = z.object({
  title: z.string().min(1),
})
const ChaptersForm = ({ initialData, courseId }: Props) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpading, setIsUpading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    }
  })
  const toggleCreating = () => { setIsCreating((current) => !current) }
  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values)
      toast.success("Chapter Created.")
      toggleCreating()
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }
  const onReorder = async (updateState: { id: string, position: number }[]) => {
    try {
      setIsUpading(true)
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, { list: updateState })
      toast.success("Chapters reordered")

    } catch (error) {
      toast.error("Something went wrong.")
    }
    finally {
      setIsUpading(false)
    }
  }
  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${initialData.id}/chapters/${id}`)
  }
  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpading && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 left-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-center">
        Course chapters
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="e.g. 'Course introduction'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <Button disabled={!isValid && isSubmitting}>Create</Button>
            </form>
          </Form>
        </>
      )}
      {!isCreating && (
        <div className={cn("text-sm mt-2", !initialData.chapters.length && "text-slate-500 italic")}>
          {initialData.chapters.length == 0 ? (
            <>
              No Chapters.
            </>
          ) : (
            <>
              <ChapterList items={initialData.chapters} onReorder={onReorder} onEdit={onEdit} />
            </>
          )}
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-forground mt-4">
          Drag and drop to reorder the chapters.
        </p>
      )}
    </div >
  )
}

export default ChaptersForm
