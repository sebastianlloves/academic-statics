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
      className='font-normal pl-2 pr-1 py-0.5 leading-tight rounded-full bg-primary/90 hover:bg-primary/90 max-w-full flex'
    >
      <div className='flex h-full justify-start items-center py-0.5'>
        <div className='text-nowrap px-1.5'>{children}</div>
        <div className='cursor-pointer flex h-full px-1 rounded-r-full border-l border-muted/40'>
          <X
            size={13} strokeWidth='1.5px' className='h-full text-inherit'
            onClick={handleClick}
          />
        </div>
      </div>
    </Badge>
  )
}

export default LabelBadge
