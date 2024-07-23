import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'

interface FilterProps {
  title: string
  children: ReactNode | ReactNode[]
}

function Filter ({ title, children }:FilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>{title}<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' /></Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='p-1'>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Filter
