import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Student } from '@/types'
import { Column } from '@tanstack/react-table'
import { ArrowUp } from 'lucide-react'

interface SortingHeaderProps{
  title: string,
  column: Column<Student>,
  className?: string
}

function SortingHeader ({ title, column, className } : SortingHeaderProps) {
  return (
    <Button
      variant='ghost'
      className={cn('font-medium text-foreground pl-8', className)}
      onClick={() => column.toggleSorting(undefined, true)}
    >
      {title}
      {!column.getIsSorted()
        ? <span className='w-4 h-[15px] ml-2' />
        : <div className='flex items-center justify-center ml-2 w-4'><ArrowUp className={`w-3 h-[15px] opacity-50 ${column.getIsSorted() === 'asc' ? '' : 'rotate-180'}`} /></div>}
    </Button>
  )
}

export default SortingHeader
