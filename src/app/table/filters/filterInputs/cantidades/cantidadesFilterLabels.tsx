import { ColumnFilter } from '@tanstack/react-table'
import { CantidadesFilterProps } from '../cantidadesFilter'
import { useMemo } from 'react'
import LabelsBox from '../../labels/labelsBox'

interface CantidadesFilterLabelsProps extends CantidadesFilterProps {
  cantidadesFilters: ColumnFilter[]
}

function CantidadesFilterLabels ({ table, cantidadesFilters }: CantidadesFilterLabelsProps) {
  const formatedFilters = useMemo(() => cantidadesFilters.map(filter => {
    console.log('Cantidades Memo')
    const minMax = (filter.value as (number[] & {length: 2}))
    const subjectType = table.getColumn(filter.id)?.columnDef.meta?.title
    const label = minMax[0] === minMax[1] ? `${minMax[0]} materias ${subjectType}` : `Entre ${minMax[0]} y ${minMax[1]} materias ${subjectType}`
    return { id: filter.id, value: minMax, label }
  })
  , [cantidadesFilters, table])

  return (
    <LabelsBox
      filterValues={formatedFilters}
      maxLabels={4}
      handleBoxClick={() => formatedFilters.forEach(formatedFilter => table.getColumn(formatedFilter.id)?.setFilterValue(undefined))}
      handleItemClick={(formatedFilter) => () => table.getColumn(formatedFilter.id)?.setFilterValue(undefined)}
    />
  )
}

export default CantidadesFilterLabels
