import { allSubjects } from '@/constants'
import { useMemo } from 'react'
import { MateriasFilterProps } from './materiasFilter'
import LabelsBox from '../../labels/labelsBox'
import { MateriasFilterState } from './materiasFilterContent'

function MateriasFilterLabels ({ table, materiasFilter, facets }: MateriasFilterProps) {
  const formatedFilters = useMemo(() => {
    if (materiasFilter !== undefined) {
      const filter = (materiasFilter.value as MateriasFilterState)
      const filterLabels = filter.subjects.reduce((acc, newValue) => {
        const anio = `${newValue.split('(')[1].split(')')[0]} año`
        if (allSubjects[anio].every(materia => acc.includes(materia))) {
          return [...acc.filter(materia => !allSubjects[anio].includes(materia)), `Todas las materias de ${anio}`]
        }
        return acc
      }, filter.subjects)
      const formatedFilters = filterLabels.map(label => {
        return {
          id: materiasFilter.id,
          label,
          value: label.includes(' año') ? [...(allSubjects[label.split('Todas las materias de ')[1]])] : [label]
        }
      })
      return filter.strictInclusion ? [...formatedFilters, { id: materiasFilter.id, label: 'Inclusión estricta', value: ['Inclusión estricta'] }] : formatedFilters
    }
    return []
  }, [materiasFilter]).map(obj => {
    return {
      ...obj,
      quantity: !obj.label.includes(' año') && obj.label !== 'Inclusión estricta'
        ? (facets?.get(obj.label) || 0)
        : undefined
    }
  })

  return (
    <LabelsBox
      filterValues={formatedFilters}
      maxLabels={3}
      handleBoxClick={() => table.getColumn(formatedFilters[0].id)?.setFilterValue(undefined)}
      handleItemClick={(formatedFilter) => () => table.getColumn(formatedFilter.id)?.setFilterValue((prevState: MateriasFilterState) => {
        if (formatedFilter.label === 'Inclusión estricta') return { ...prevState, strictInclusion: false }
        const newSubjectsState = prevState.subjects.filter((prevValue) => {
          if (formatedFilter.label.includes(' año')) return !allSubjects[formatedFilter.label.split('Todas las materias de ')[1]].includes(prevValue)
          return !(formatedFilter.value as string[]).includes(prevValue)
        })
        return newSubjectsState.length ? { ...prevState, subjects: newSubjectsState } : undefined
      })}
    />
  )
}

export default MateriasFilterLabels
