import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CirclePlus } from 'lucide-react'
import { ReactNode } from 'react'

interface DropdownFilterProps {
  title: string
  children: ReactNode | ReactNode[]
}

function DropdownFilter ({ title, children }:DropdownFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'><CirclePlus strokeWidth='1.5px' size={15} className='mr-3' />{title}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='p-1'>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownFilter
