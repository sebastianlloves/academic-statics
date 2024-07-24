import { Student } from '@/types'
import { ColumnFilter, Table } from '@tanstack/react-table'
import FilterBox from './filterBox'

interface PromocionFilterBoxProps {
  filter: ColumnFilter,
  table: Table<Student>
}

function PromocionFilterBox ({ filter, table }: PromocionFilterBoxProps) {
  const filterValue = [
    {
      id: filter.id,
      value: filter.value === 'permanece' ? 'Sólo estudiantes que permanecen' : 'Sólo estudiantes que promocionan'
    }
  ]

  return (
    <FilterBox
      title='Promoción'
      filterValues={filterValue}
      handleBoxClick={() => table.getColumn(filter.id)?.setFilterValue(undefined)}
      handleItemClick={() => () => table.getColumn(filter.id)?.setFilterValue(undefined)}
    />
  )
}

export default PromocionFilterBox
