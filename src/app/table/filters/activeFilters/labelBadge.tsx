import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { X } from 'lucide-react'
import React from 'react'

interface LabelBadgeProps {
  handleClick: () => void,
  children: React.ReactNode
}

function LabelBadge ({ handleClick, children }: LabelBadgeProps) {
  return (
    <Badge
      variant='default'
      className='font-normal px-2 leading-tight rounded-full bg-primary/90 hover:bg-primary/90'
    >
      <div className='flex justify-start items-center'>
        <div className='text-nowrap px-1.5'>{children}</div>
        <Separator orientation='vertical' className='mx-1 h-3 bg-muted/30' />
        <X
          size={13} strokeWidth='1.5px' className='text-inherit cursor-pointer'
          onClick={handleClick}
        />
      </div>
    </Badge>
  )
}

export default LabelBadge
