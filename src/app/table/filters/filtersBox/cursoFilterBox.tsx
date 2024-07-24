import { CURSOS } from '@/constants'
import { CURSO, Student } from '@/types'
import { ColumnFilter, Table } from '@tanstack/react-table'
import { useMemo } from 'react'
import FilterBox from './filterBox'

interface CursoFilterBoxProps {
  filter: ColumnFilter,
  table: Table<Student>
}

function CursoFilterBox ({ filter, table }: CursoFilterBoxProps) {
  const filterValue = filter.value as string[]
  const coursesByYear = useMemo(() =>
    Object.fromEntries(Object.keys(CURSOS)
      .map(anio => [`${anio}° año`, CURSOS[Number(anio) as keyof(typeof CURSOS)]
        .map(({ nombre }) => nombre)]))
  , [])
  const filterValues = filterValue
    .reduce((acc, newValue) => {
      const anio = newValue.split(' ')[0]
      if (coursesByYear[`${anio} año`].every(curso => acc.includes(curso))) {
        return [...acc.filter(value => !coursesByYear[`${anio} año`].includes(value as CURSO)), `${anio} año`]
      }
      return acc
    }, filterValue).map(value => { return { id: filter.id, value } })
  console.log(coursesByYear)

  return (
    <FilterBox
      title='Cursos'
      filterValues={filterValues}
      handleBoxClick={() => table.getColumn(filter.id)?.setFilterValue(undefined)}
      handleItemClick={(filter) => () => table.getColumn(filter.id)?.setFilterValue((prevState: string[]) => {
        const filterValue = filter.value as string
        const newState = coursesByYear[filterValue]
          ? prevState.filter(prevValue => !coursesByYear[filterValue].includes(prevValue as CURSO))
          : prevState.filter(prevValue => prevValue !== filterValue)
        return newState.length ? newState : undefined
      })}
    />
  )
}

export default CursoFilterBox
