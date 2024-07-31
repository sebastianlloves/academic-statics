import { Badge } from '@/components/ui/badge'
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
      className='font-normal pl-2 pr-1 py-1 leading-tight rounded-full bg-primary/10 hover:bg-primary/10 max-w-full flex border-primary/55 shadow-sm'
    >
      <div className='flex h-full justify-start items-center py-0.5'>
        <div className='text-nowrap px-1.5 text-foreground'>{children}</div>
        <div className='cursor-pointer flex h-full px-1 rounded-r-full border-l border-muted-foreground/20'>
          <X
            size={13} strokeWidth='1.5px' className='h-full text-muted-foreground/60'
            onClick={handleClick}
          />
        </div>
      </div>
    </Badge>
  )
}

export default LabelBadge
