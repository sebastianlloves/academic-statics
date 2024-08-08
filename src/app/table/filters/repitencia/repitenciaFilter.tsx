import { Table } from '@tanstack/react-table'
import DropdownFilter from '../filterInputs/dropdownFilter'
import FilterBox from '../filterInputs/filterBox'
import { Student } from '@/types'
import RepitenciaFilterContent from './repitenciaFilterContent'
import RepitenciaFilterLabels from './repitenciaFilterLabels'

export interface RepitenciaFilterProps {
  table: Table<Student>
}

function RepitenciaFilter ({ table }: RepitenciaFilterProps) {
  const repitenciaFilter = table.getState().columnFilters.find(filtro => filtro.id === 'repitencia')
  const facets = table.getColumn('repitencia')?.getFacetedUniqueValues()

  return (
    <FilterBox>
      <DropdownFilter title='Repitencia'>
        <RepitenciaFilterContent table={table} repitenciaFilter={repitenciaFilter} facets={facets} />
      </DropdownFilter>
      {repitenciaFilter !== undefined && <RepitenciaFilterLabels table={table} repitenciaFilter={repitenciaFilter} facets={facets} />}
    </FilterBox>
  )
}

export default RepitenciaFilter
