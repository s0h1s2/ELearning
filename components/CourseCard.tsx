import Link from 'next/link'
import Image from "next/image"
import React from 'react'
import IconBadge from './IconBadge'
import { BookOpen } from 'lucide-react'
import { formatPrice } from '@/lib/format'
interface Props {
  id: string
  title: string
  thumbnail: string
  chaptersLength: number
  price: number | null
  progress: number | null
  category: string
}
const CourseCard = ({ id, title, thumbnail, chaptersLength, category, price, progress }: Props) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image src={thumbnail} alt={title} fill objectFit="cover" />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge icon={BookOpen} variant={"success"} size={"sm"} />
              <span>{chaptersLength} {chaptersLength > 1 ? "Chapters" : "Chapter"}</span>
            </div>
          </div>
          {progress !== null ? (
            <div>
              {/*TODO:Progress Component*/}
            </div>
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">{formatPrice(price!)}</p>
          )}
        </div>
      </div>
    </Link >
  )
}

export default CourseCard
