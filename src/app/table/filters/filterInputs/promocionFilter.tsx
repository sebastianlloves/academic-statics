import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { Student } from '@/types'
import { Table } from '@tanstack/react-table'
import Item from './item'
import Filter from '../filter'

interface PromocionFilterProps {
  table: Table<Student>
}

function PromocionFilter ({ table } : PromocionFilterProps) {
  const promocionFilter = (table.getColumn('promocion')?.getFilterValue()) as string | undefined
  const facets = table.getColumn('promocion')?.getFacetedUniqueValues()

  return (
    <Filter title='Promoción'>
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
    </Filter>
  )
}

export default PromocionFilter
