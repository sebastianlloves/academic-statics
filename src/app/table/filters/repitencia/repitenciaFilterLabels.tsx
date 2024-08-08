import { useMemo } from 'react'
import LabelsBox from '../labels/labelsBox'
import { RepitenciaFilterContentProps, RepitenciaFilterState } from './repitenciaFilterContent'

function RepitenciaFilterLabels ({ table, facets, repitenciaFilter }: RepitenciaFilterContentProps) {
  const formatedFilters = useMemo(() => {
    if (repitenciaFilter !== undefined) {
      const filterValue = repitenciaFilter?.value as (RepitenciaFilterState | undefined)
      const formatedRepAnios = (filterValue?.repAnios || []).map(repAnio => {
        return {
          id: repitenciaFilter.id,
          value: repAnio,
          label: `Repitió ${repAnio}° año`,
          quantity: facets?.get(repAnio) || 0
        }
      })
      const formatedQuantity = filterValue?.quantity === undefined
        ? []
        : [{
            id: repitenciaFilter.id,
            value: filterValue.quantity,
            label: filterValue.quantity[0] === filterValue.quantity[1]
              ? `Repitió ${filterValue.quantity[0]} ${filterValue.quantity[0] === 1 ? 'vez' : 'veces'}`
              : `Entre ${filterValue.quantity[0]} y ${filterValue.quantity[1]} repitencias`
          }]
      return [...formatedRepAnios, ...formatedQuantity]
    }
    return []
  }, [repitenciaFilter, facets])

  return (
    <LabelsBox
      filterValues={formatedFilters}
      maxLabels={4}
      handleBoxClick={() => formatedFilters.forEach(formatedFilter => table.getColumn(formatedFilter.id)?.setFilterValue(undefined))}
      handleItemClick={(formatedFilter) => () => {
        /* table.getColumn(formatedFilter.id)?.setFilterValue((prevState: RepitenciaFilterState) => {
          if(!formatedFilter.label.includes('año'))
        }) */
      }}
    />
  )
}

export default RepitenciaFilterLabels
