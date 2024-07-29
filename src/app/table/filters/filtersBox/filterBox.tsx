import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ColumnFilter } from '@tanstack/react-table'
import { X } from 'lucide-react'

interface FilterBoxProps {
  title: string,
  filterValues: ColumnFilter[],
  handleBoxClick: () => void,
  handleItemClick: (filter: ColumnFilter) => () => void
}

function FilterBox ({ title, filterValues, handleBoxClick, handleItemClick }: FilterBoxProps) {
  return filterValues.length > 0 && (
    <div className='border p-2 rounded-md grid space-y-1 shadow-sm'>
      <div className='flex justify-between items-center'>
        <h4 className='font-medium text-muted-foreground text-sm scroll-m-20 tracking-tight'>{title}</h4>
        <X
          size={15} strokeWidth='1.5px' className='text-muted-foreground cursor-pointer'
          onClick={handleBoxClick}
        />
      </div>
      <div className='flex justify-start gap-1.5 p-1 flex-wrap max-h-20 overflow-hidden'>
        {
        (filterValues).map((filter) => (
          <Badge
            key={(filter.value as string)}
            variant='default'
            className='font-normal px-2 leading-tight cursor-pointer rounded-full'
            onClick={handleItemClick(filter)}
          >
            <div className='flex justify-start items-center gap-x-3 pl-1'>
              <p className=''>{(filter.value as string)}</p>
              <X size={13} strokeWidth='1.5px' className='text-inherit cursor-pointer' />
            </div>
          </Badge>
        ))
      }
      </div>
    </div>
  )
}

export default FilterBox
