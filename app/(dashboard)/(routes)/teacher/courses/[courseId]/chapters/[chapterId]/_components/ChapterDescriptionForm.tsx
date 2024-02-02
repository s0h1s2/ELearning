'use client'
import React, { useState } from 'react'
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Chapter } from '@prisma/client'
import Editor from '@/components/Editor'
import Preview from '@/components/Preview'

interface Props {
  initialData: Chapter;
  courseId: string;
  chapterId: string;

}
const formSchema = z.object({
  description: z.string().min(1)
})
const DescriptionForm = ({ initialData, courseId, chapterId }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || ""
    }
  })
  const router = useRouter()
  const [isEdit, setIsEdit] = useState(false)
  const toggleEdit = () => { setIsEdit((current) => !current) }
  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toggleEdit()
      toast.success("Chapter updated")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-center">
        Chapter Description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEdit ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Description
            </>
          )}
        </Button>
      </div>
      {isEdit ? (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid && isSubmitting}>Save</Button>
              </div>
            </form>
          </Form>
        </>
      ) : (
        <p className={cn("text-sm mt-2 ", !initialData.description && "text-slate-500 italic")}>
          {initialData.description ? (
            <Preview value={initialData?.description} />
          ) : (
            <div>
              No Description
            </div>
          )}
        </p>
      )
      }
    </div >
  )
}

export default DescriptionForm 
