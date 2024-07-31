import { Table } from '@tanstack/react-table'
import { Student } from '@/types'
import DropdownFilter from '../dropdownFilter'
import CantidadesFilterContent from './cantidadesFilterContent'
import CantidadesFilterLabels from './cantidadesFilterLabels'
import FilterBox from '../filterBox'

export interface CantidadesFilterProps {
  table: Table<Student>
}

function CantidadesFilter ({ table } : CantidadesFilterProps) {
  const cantidadesFilterValues = [
    table.getState().columnFilters.find(filtro => filtro.id === 'troncales'),
    table.getState().columnFilters.find(filtro => filtro.id === 'generales'),
    table.getState().columnFilters.find(filtro => filtro.id === 'enProceso2020')
  ].filter(value => value !== undefined)
  return (
    <FilterBox>
      <DropdownFilter title='Cantidades'>
        <CantidadesFilterContent table={table} />
      </DropdownFilter>
      {cantidadesFilterValues.length > 0 && <CantidadesFilterLabels table={table} cantidadesFilters={cantidadesFilterValues} />}
    </FilterBox>
  )
}

export default CantidadesFilter
