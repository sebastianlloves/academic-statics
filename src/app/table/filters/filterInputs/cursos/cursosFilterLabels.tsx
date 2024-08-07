import { coursesByYear } from '@/constants'
import { useMemo } from 'react'
import { CURSO } from '@/types'
import LabelsBox from '../../labels/labelsBox'
import { CursosFilterContentProps } from './cursosFilterContent'

function CursosFilterLabels ({ table, cursosFilter, facets }: CursosFilterContentProps) {
  const formatedFilters = useMemo(() => {
    if (cursosFilter !== undefined) {
      const filterLabels = (cursosFilter.value as string[]).reduce((acc, newValue) => {
        const anio = newValue.split(' ')[0]
        if (coursesByYear[`${anio} año`].every(curso => acc.includes(curso))) {
          return [...acc.filter(value => !coursesByYear[`${anio} año`].includes(value as CURSO)), `${anio} año`]
        }
        return acc
      }, (cursosFilter.value as string[]))
      return filterLabels.map(label => {
        return {
          id: cursosFilter.id,
          label,
          value: label.includes(' año') ? [...coursesByYear[label]] : [label]
        }
      })
    }
    return []
  }, [cursosFilter]).map(obj => {
    return { ...obj, quantity: obj.label.includes(' año') ? coursesByYear[obj.label]?.reduce((acc, newValue) => acc + (facets?.get(newValue) || 0), 0) : (facets?.get(obj.label) || 0) }
  })

  return (
    <LabelsBox
      filterValues={formatedFilters}
      maxLabels={4}
      handleBoxClick={() => table.getColumn(formatedFilters[0].id)?.setFilterValue(undefined)}
      handleItemClick={(filter) => () => table.getColumn(filter.id)?.setFilterValue((prevState: string[]) => {
        const newState = prevState.filter(prevValue => !(filter.value as string[]).includes(prevValue))
        return newState.length ? newState : undefined
      })}
    />
  )
}

export default CursosFilterLabels
