import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertTriangle, CheckCircle } from 'lucide-react'
import React from 'react'
const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
      }
    },
    defaultVariants: {
      variant: "warning"
    }
  }
)
const iconMap = {
  warning: AlertTriangle,
  success: CheckCircle,

}
interface Props extends VariantProps<typeof bannerVariants> {
  content: string
}
const Banner = ({ variant, content }: Props) => {
  const Icon = iconMap[variant || "warning"]
  return (
    <div className={cn(bannerVariants({ variant }))} >
      <Icon className="w-4 h-4 mr-2" />
      {content}
    </div >
  )
}

export default Banner
