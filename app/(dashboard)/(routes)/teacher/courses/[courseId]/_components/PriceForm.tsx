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
import { Textarea } from '@/components/ui/textarea'
import { Course } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/format'

interface Props {
  initialData: Course,
  courseId: string
}
const formSchema = z.object({
  price: z.coerce.number()
})
const PriceForm = ({ initialData, courseId }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || 0
    }
  })
  const router = useRouter()
  const [isEdit, setIsEdit] = useState(false)
  const toggleEdit = () => { setIsEdit((current) => !current) }
  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
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
        Course description
        <Button variant="ghost" onClick={toggleEdit}>
          {isEdit ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Price
            </>
          )}
        </Button>
      </div>
      {isEdit ? (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="number" step="0.01" disabled={isSubmitting} placeholder="e.g. 29.99" {...field} />
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
        <p className={cn("text-sm mt-2 ", !initialData.price && "text-slate-500 italic")}>
          {initialData.price ? formatPrice(initialData.price) : "Free"}
        </p>
      )
      }
    </div >
  )
}

export default PriceForm
