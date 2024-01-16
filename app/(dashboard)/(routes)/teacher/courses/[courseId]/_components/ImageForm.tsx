'use client'
import React, { useState } from 'react'
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Course } from '@prisma/client'
import Image from 'next/image'
interface Props {
  initialData: Course,
  courseId: string
}
const formSchema = z.object({
  imageUrl: z.string().min(1)
})
const ImageForm = ({ initialData, courseId }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData.thumbnail || ""
    }
  })
  const router = useRouter()
  const [isEdit, setIsEdit] = useState(false)
  const toggleEdit = () => { setIsEdit((current) => !current) }
  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toast.success("Course updated")
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-center">
        Course image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEdit ? (
            <>Cancel</>
          ) : (
            <>
              {!initialData.thumbnail ? (<>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add an image
              </>) : (<>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Image
              </>)}
            </>
          )}
        </Button>
      </div>
      {!isEdit && !initialData.thumbnail ? (
        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
          <ImageIcon className="h-10 w-10 text-slate-500" />
        </div>
      ) : (
        <div className="relative aspect-video mt-2">
          <Image alt="Upload" fill src={initialData.thumbnail} className="object-cover rounded-md" />
        </div>
      )}
      {isEdit ? (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea disabled={isSubmitting} placeholder="e.g. 'This course is about'" {...field} />

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
          {initialData.description || "No description"}
        </p>
      )
      }
    </div >
  )
}

export default ImageForm
