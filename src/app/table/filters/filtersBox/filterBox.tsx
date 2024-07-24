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
    <div className='border p-2 rounded-md grid space-y-2 shadow-sm'>
      <div className='flex justify-between items-center'>
        <h4 className='font-medium text-muted-foreground text-xs uppercase'>{title}</h4>
        <X
          size={15} strokeWidth='1.5px' className='text-muted-foreground cursor-pointer'
          onClick={handleBoxClick}
        />
      </div>
      <div className='flex justify-start gap-2 p-1 flex-wrap'>
        {
        (filterValues).map((filter) => (
          <Badge
            key={(filter.value as string)}
            variant='secondary'
            className='font-normal pl-2 pr-1 leading-tight cursor-pointer'
            onClick={handleItemClick(filter)}
          >
            <div className='flex justify-start items-start gap-x-3'>
              <p className=''>{(filter.value as string)}</p>
              <X size={13} strokeWidth='1.5px' className='text-muted-foreground cursor-pointer hover:text-foreground' />
            </div>
          </Badge>
        ))
      }
      </div>
    </div>
  )
}

export default FilterBox
