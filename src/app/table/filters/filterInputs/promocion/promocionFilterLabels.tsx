import { useMemo } from 'react'
import LabelsBox from '../../labels/labelsBox'
import { PromocionFilterProps } from './promocionFilter'
import { ColumnFilter } from '@tanstack/react-table'

interface PromocionFilterLabelsProps extends PromocionFilterProps {
  promocionFilter: ColumnFilter,
  facets?: Map<string, number>
}

function PromocionFilterLabels ({ table, promocionFilter, facets }: PromocionFilterLabelsProps) {
  const formatedFilters = useMemo(() => promocionFilter.value === 'permanece'
    ? [{ id: promocionFilter.id, value: promocionFilter.value, label: 'Sólo estudiantes que permanecen' }]
    : [{ id: promocionFilter.id, value: promocionFilter.value, label: 'Sólo estudiantes que promocionan' }]
  , [promocionFilter]).map(obj => {
    return {
      ...obj,
      quantity: promocionFilter !== undefined
        ? (facets?.get(promocionFilter.value as string) || 0)
        : undefined
    }
  })

  return (
    <LabelsBox
      filterValues={formatedFilters}
      maxLabels={4}
      handleBoxClick={() => table.getColumn(formatedFilters[0].id)?.setFilterValue(undefined)}
      handleItemClick={(formatedFilter) => () => table.getColumn(formatedFilter.id)?.setFilterValue(undefined)}
    />
  )
}

export default PromocionFilterLabels
