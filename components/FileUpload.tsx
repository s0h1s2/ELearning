'use client'
import React from 'react'
import toast from "react-hot-toast"

import { ourFileRouter } from "@/app/api/uploadthing/core"
import { UploadDropzone } from "@/lib/uploadthing"
interface Props {
  onChange: (url?: string) => void,
  endpoint: keyof typeof ourFileRouter

}

const FileUpload = ({ onChange, endpoint }: Props) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onUploadError={(e) => {
        toast.error(e.message)
      }}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }} />
  )
}

export default FileUpload
