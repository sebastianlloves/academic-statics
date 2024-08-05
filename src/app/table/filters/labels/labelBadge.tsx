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
      className='font-normal pl-2 pr-1 py-1.5 leading-tight rounded-2xl bg-primary/10 hover:bg-primary/10 max-w-full flex justify-center items-center border-primary/70 shadow-sm'
    >
      <div className='flex h-full justify-start items-center'>
        <div className='text-nowrap px-1.5 text-foreground'>{children}</div>
        <div className='cursor-pointer flex h-full px-1 rounded-r-full border-l border-accent-foreground/15'>
          <X
            size={13} strokeWidth='1.5px' className='h-full text-accent-foreground/55'
            onClick={handleClick}
          />
        </div>
      </div>
    </Badge>
  )
}

export default LabelBadge
