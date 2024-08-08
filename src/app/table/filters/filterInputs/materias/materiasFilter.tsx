import { Student } from '@/types'
import { ColumnFilter, Table } from '@tanstack/react-table'
import DropdownFilter from '../dropdownFilter'
import MateriasFilterContent from './materiasFilterContent'
import MateriasFilterLabels from './materiasFilterLabels'
import FilterBox from '../filterBox'

export interface MateriasFilterProps {
  table: Table<Student>,
  materiasFilter?: ColumnFilter,
  facets?: Map<string, number>
}

function MateriasFilter ({ table } : MateriasFilterProps) {
  const facets = table.getColumn('expand')?.getFacetedUniqueValues()
  const materiasFilter = table.getState().columnFilters.find(filtro => filtro.id === 'expand')

  return (
    <FilterBox>
      <DropdownFilter title='Materias'>
        <MateriasFilterContent table={table} materiasFilter={materiasFilter} facets={facets} />
      </DropdownFilter>

      {materiasFilter !== undefined && <MateriasFilterLabels table={table} materiasFilter={materiasFilter} facets={facets} />}
    </FilterBox>
  )
}

export default MateriasFilter
