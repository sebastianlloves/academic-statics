import { ANIO, Student } from '@/types'
import { ColumnFilter, Table } from '@tanstack/react-table'
import { useMemo } from 'react'
import FilterBox from './filterBox'
import { MateriasFilterState } from '../filterInputs/materiasFilter'
import { MATERIAS_POR_CURSO } from '@/constants'

interface MateriasFilterBoxProps {
  filter: ColumnFilter,
  table: Table<Student>
}

function MateriasFilterBox ({ filter, table }: MateriasFilterBoxProps) {
  const filterValue = filter.value as MateriasFilterState
  const allSubjects : {[key: string]: string[]} = useMemo(() => {
    const entriesSubjectsObject = Object.keys(MATERIAS_POR_CURSO).map(anio => {
      const subjectsByAnio = MATERIAS_POR_CURSO[Number(anio) as ANIO].map(objSubject => `${objSubject.nombre} (${anio}°)`)
      return [`${anio}° año`, subjectsByAnio]
    })
    return Object.fromEntries(entriesSubjectsObject)
  }, [])
  const subjectsValues = (filterValue.subjects || [])
    .reduce((acc, newValue) => {
      const anio = `${newValue.split('(')[1].split(')')[0]} año`
      if (allSubjects[anio].every(materia => acc.includes(materia))) {
        return [...acc.filter(materia => !allSubjects[anio].includes(materia)), `Todas las materias de ${anio}`]
      }
      return acc
    }, filterValue.subjects)

  const filterValues = subjectsValues.map(subject => {
    return { id: filter.id, value: subject }
  })

  return (
    <FilterBox
      title='Materias'
      filterValues={filterValue.strictInclusion ? [{ id: filter.id, value: 'Inclusión estricta' }, ...filterValues] : filterValues}
      handleBoxClick={() => table.getColumn(filter.id)?.setFilterValue(undefined)}
      handleItemClick={(filter) => () => table.getColumn(filter.id)?.setFilterValue((prevState: MateriasFilterState) => {
        if (filter.value === 'Inclusión estricta') return { ...prevState, strictInclusion: false }
        const filterValue = filter.value as string
        const newSubjectsState = filterValue.includes('Todas las materias de ')
          ? prevState.subjects.filter(prevValue => !allSubjects[filterValue.split('Todas las materias de ')[1]].includes(prevValue))
          : prevState.subjects.filter(prevValue => prevValue !== filterValue)
        return newSubjectsState.length ? { ...prevState, subjects: newSubjectsState } : undefined
      })}
    />
  )
}

export default MateriasFilterBox
