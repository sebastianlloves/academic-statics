import { Student } from '@/types'
import { ColumnFilter, Table } from '@tanstack/react-table'
import DropdownFilter from '../../dropdownFilter'
import CursosFilterContent from './cursosFilterContent'
import CursosFilterLabels from './cursosFilterLabels'

export interface CursosFilterProps {
  table: Table<Student>,
  cursosFilter?: ColumnFilter,
  facets?: Map<string, number>
}

function CursosFilter ({ table }: CursosFilterProps) {
  const cursosFilter = table.getState().columnFilters.find(filtro => filtro.id === 'curso')
  const facets = table.getColumn('curso')?.getFacetedUniqueValues()

  return (
    <div className='border rounded-lg w-full shadow-sm'>
      <DropdownFilter title='Cursos'>
        <CursosFilterContent table={table} cursosFilter={cursosFilter} facets={facets} />
      </DropdownFilter>
      {cursosFilter !== undefined && <CursosFilterLabels table={table} cursosFilter={cursosFilter} facets={facets} />}
    </div>
  )
}

export default CursosFilter
