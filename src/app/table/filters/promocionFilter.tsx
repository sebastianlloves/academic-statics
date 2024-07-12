import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Student } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import Item from './item'

interface PromocionFilterProps {
  table: Table<Student>
}

function PromocionFilter ({ table } : PromocionFilterProps) {
  const promocionFilter = (table.getColumn('promocion')?.getFilterValue()) as string | undefined
  const facets = table.getColumn('promocion')?.getFacetedUniqueValues()
  console.log(facets)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>
          Promoción<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='p-3'>
        <DropdownMenuRadioGroup
          value={promocionFilter}
          onValueChange={(value) => table.getColumn('promocion')?.setFilterValue(value === promocionFilter ? undefined : value)}
          className='flex flex-col'
        >
          <DropdownMenuRadioItem
            value='permanece'
            onSelect={(e) => e.preventDefault()}
            className='cursor-pointer'
          >
            <Item value='Sólo estudiantes que permanecen' quantity={facets?.get('permanece') ?? 0} />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value='promociona'
            onSelect={(e) => e.preventDefault()}
            className='cursor-pointer'
          >
            <Item value='Sólo estudiantes que promocionan' quantity={facets?.get('promociona') ?? 0} />
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PromocionFilter
