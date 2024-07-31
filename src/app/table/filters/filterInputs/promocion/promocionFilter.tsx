import { Student } from '@/types'
import { Table } from '@tanstack/react-table'
import DropdownFilter from '../dropdownFilter'
import PromocionFilterContent from './promocionFilterContent'
import PromocionFilterLabels from './promocionFilterLabels'
import FilterBox from '../filterBox'

export interface PromocionFilterProps {
  table: Table<Student>
}

function PromocionFilter ({ table } : PromocionFilterProps) {
  const promocionFilter = table.getState().columnFilters.find(filtro => filtro.id === 'promocion')
  const facets = table.getColumn('promocion')?.getFacetedUniqueValues()
  console.log(promocionFilter)

  return (
    <FilterBox>
      <DropdownFilter title='Promoción'>
        <PromocionFilterContent table={table} promocionFilter={promocionFilter} facets={facets} />
      </DropdownFilter>
      {promocionFilter !== undefined && <PromocionFilterLabels table={table} promocionFilter={promocionFilter} facets={facets} />}
    </FilterBox>
  )
}

export default PromocionFilter
