import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import Item from '../item'
import { PromocionFilterProps } from './promocionFilter'
import { ColumnFilter } from '@tanstack/react-table'

export interface PromocionFilterContentProps extends PromocionFilterProps {
  promocionFilter?: ColumnFilter
  facets?: Map<string, number>
}

function PromocionFilterContent ({ table, facets, promocionFilter }: PromocionFilterContentProps) {
  const promocionFilterValue = (promocionFilter?.value as string | undefined)
  return (
    <DropdownMenuRadioGroup
      value={promocionFilterValue}
      onValueChange={(value) => table.getColumn('promocion')?.setFilterValue(value === promocionFilterValue ? undefined : value)}
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
  )
}

export default PromocionFilterContent
