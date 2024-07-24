import { Badge } from '@/components/ui/badge'
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
    <div className='p-0 rounded-md grid'>
      <X
        size={15} strokeWidth='1.5px' className='text-muted-foreground cursor-pointer ml-auto'
        onClick={handleBoxClick}
      />
      <div className='flex justify-start gap-2 p-1 pt-0 flex-wrap'>
        {
        (filterValues).map((filter) => (
          <Badge
            key={(filter.value as string)}
            variant='default'
            className='font-medium rounded-full px-2 leading-tight cursor-pointer bg-primary/80'
            onClick={handleItemClick(filter)}
          >
            <div className='flex justify-start items-center gap-x-3'>
              <p className=''>{(filter.value as string)}</p>
              <X size={13} strokeWidth='1.5px' className='text-inherit cursor-pointer hover:text-foreground' />
            </div>
          </Badge>
        ))
      }
      </div>
    </div>
  )
}

export default FilterBox
