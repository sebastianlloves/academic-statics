import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { ReactNode } from 'react'

interface FilterProps {
  title: string
  children: ReactNode | ReactNode[]
}

function Filter ({ title, children }:FilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-full'>
        <Button variant='ghost' className='font-medium border-0 shadow-none'>{title}<ChevronDown className='ml-auto h-4 w-4 opacity-70' /></Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='p-1'>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Filter
