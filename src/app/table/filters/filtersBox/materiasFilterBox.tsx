import { ANIO, Student } from '@/types'
import { Column, ColumnFilter } from '@tanstack/react-table'
import { useMemo } from 'react'
import FilterBox from './filterBox'
import { MateriasFilterState } from '../filterInputs/materiasFilter'
import { MATERIAS_POR_CURSO } from '@/constants'

interface MateriasFilterBoxProps {
  filter: ColumnFilter,
  column?: Column<Student>
}

function MateriasFilterBox ({ filter, column }: MateriasFilterBoxProps) {
  const filterValue = filter.value as MateriasFilterState
  const allSubjects : {[key: string]: string[]} = useMemo(() => {
    const entriesSubjectsObject = Object.keys(MATERIAS_POR_CURSO).map(anio => {
      const subjectsByAnio = MATERIAS_POR_CURSO[Number(anio) as ANIO].map(objSubject => `${objSubject.nombre} (${anio}°)`)
      return [`${anio}° año`, subjectsByAnio]
    })
    return Object.fromEntries(entriesSubjectsObject)
  }, [])
  const filterValues = (filterValue.subjects || [])
    .reduce((acc, newValue) => {
      const anio = `${newValue.split('(')[1].split(')')[0]} año`
      if (allSubjects[anio].every(materia => acc.includes(materia))) {
        return [...acc.filter(materia => !allSubjects[anio].includes(materia)), `Materias de ${anio}`]
      }
      return acc
    }, filterValue.subjects)

  return (
    <FilterBox
      title='Materias'
      filterValues={filterValue.strictInclusion ? ['Inclusión estricta', ...filterValues] : filterValues}
      handleBoxClick={() => column?.setFilterValue(undefined)}
      handleItemClick={(item) => () => column?.setFilterValue((prevState: MateriasFilterState) => {
        if (item === 'Inclusión estricta') return { ...prevState, strictInclusion: false }
        const newSubjectsState = item.includes('Materias de ')
          ? prevState.subjects.filter(prevValue => !allSubjects[item.split('Materias de ')[1]].includes(prevValue))
          : prevState.subjects.filter(prevValue => prevValue !== item)
        return newSubjectsState.length ? { ...prevState, subjects: newSubjectsState } : undefined
      })}
    />
  )
}

export default MateriasFilterBox
