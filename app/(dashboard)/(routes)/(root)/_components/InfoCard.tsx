import IconBadge from '@/components/IconBadge'
import { LucideIcon } from 'lucide-react'
import React from 'react'
interface Props {
  numberOfItems: number
  variant?: "default" | "success"
  label: string
  icon: LucideIcon
}
const InfoCard = ({ variant, numberOfItems, label, icon: Icon }: Props) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">
          {label}
        </p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems > 1 ? "Courses" : "Course"}
        </p>
      </div>
    </div>
  )
}

export default InfoCard
