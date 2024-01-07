import React from 'react'
interface Props {
  initialData: {
    title: string
  },
  courseId: string
}
const TitleForm = ({ initialData, courseId }: Props) => {
  return (
    <div>Title Form</div>
  )
}

export default TitleForm
