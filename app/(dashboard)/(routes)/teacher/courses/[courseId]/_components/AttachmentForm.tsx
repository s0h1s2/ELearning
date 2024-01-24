'use client'
import React, { useState } from 'react'
import z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { File, Loader2, Pencil, PlusCircle, X } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Attachment, Course } from '@prisma/client'
import Image from 'next/image'
import FileUpload from '@/components/FileUpload'
interface Props {
  initialData: Course & { attachments: Attachment[] },
  courseId: string
}
const formSchema = z.object({
  url: z.string()
})
const AttachmentsForm = ({ initialData, courseId }: Props) => {
  const router = useRouter()
  const [isEdit, setIsEdit] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const toggleEdit = () => { setIsEdit((current) => !current) }
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values)
      toast.success("Course updated")
      toggleEdit()
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }
  async function deleteAttachment(id: string) {
    try {
      setDeletingId(id)
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
      toast.success("Attachment deleted")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-center">
        Course attachments
        <Button variant="ghost" onClick={toggleEdit}>
          {isEdit ? (
            <>Cancel</>
          ) : (
            <>
              {!initialData.attachments.length ? (<>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add an attachment
              </>) : (<>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Attachments
              </>)}
            </>
          )}
        </Button>
      </div>
      {isEdit ? (
        <div>
          <FileUpload onChange={(url) => {
            if (url) {
              onSubmit({ url: url })
            }
          }} endpoint='courseAttatchment' />
        </div>
      ) : (
        <>
          {initialData.attachments.length == 0 ? (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachment yet.
            </p>
          ) : (
            <div>
              {initialData.attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center p-3 w-full bg-sky-100 border border-sky-200 text-sky-700 rounded-md">
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">
                    {attachment.name}
                  </p>
                  {deletingId == attachment.url ? (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    <button className="ml-auto hover:opacity-75 transition" onClick={() => deleteAttachment(attachment.id)}>
                      <X className="h-4 w-4" />
                    </button>

                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div >
  )
}

export default AttachmentsForm
