import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronRight } from 'lucide-react'
import { ReactNode } from 'react'

interface DropdownFilterProps {
  title: string
  children: ReactNode | ReactNode[]
}

function DropdownFilter ({ title, children }:DropdownFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='font-medium shadow-sm py-2 tracking-wide w-full'>
          {title.toUpperCase()}<ChevronRight className='ml-auto h-4 w-4 opacity-70' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' alignOffset={-1} side='right' className='p-1'>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownFilter
