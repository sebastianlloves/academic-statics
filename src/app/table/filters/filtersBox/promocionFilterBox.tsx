import { Student } from '@/types'
import { Column, ColumnFilter } from '@tanstack/react-table'
import FilterBox from './filterBox'

interface PromocionFilterBoxProps {
  filter: ColumnFilter,
  column?: Column<Student>
}

function PromocionFilterBox ({ filter, column }: PromocionFilterBoxProps) {
  const filterValue = [filter.value === 'permanece' ? 'Sólo estudiantes que permanecen' : 'Sólo estudiantes que promocionan']

  return (
    <FilterBox
      title='Promoción'
      filterValues={filterValue}
      handleBoxClick={() => column?.setFilterValue(undefined)}
      handleItemClick={() => () => column?.setFilterValue(undefined)}
    />
  )
}

export default PromocionFilterBox
