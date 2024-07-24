import { CURSOS } from '@/constants'
import { CURSO, Student } from '@/types'
import { ColumnFiltersState, Table } from '@tanstack/react-table'
import { useMemo } from 'react'
import FilterBox from './filterBox'
import CursoFilter from '../filterInputs/cursosFilter'
import { Separator } from '@/components/ui/separator'

interface CursoFilterBoxProps {
  filters: ColumnFiltersState,
  table: Table<Student>
}

function CursoFilterBox ({ filters, table }: CursoFilterBoxProps) {
  const cursoFilter = filters?.find(filtro => filtro.id === 'curso')
  const coursesByYear = useMemo(() =>
    Object.fromEntries(Object.keys(CURSOS)
      .map(anio => [`${anio}° año`, CURSOS[Number(anio) as keyof(typeof CURSOS)]
        .map(({ nombre }) => nombre)]))
  , [])
  const filterValues = useMemo(() => {
    if (cursoFilter !== undefined) {
      const filterValue = cursoFilter?.value as string[]
      const formatedFilterValues = filterValue.reduce((acc, newValue) => {
        const anio = newValue.split(' ')[0]
        if (coursesByYear[`${anio} año`].every(curso => acc.includes(curso))) {
          return [...acc.filter(value => !coursesByYear[`${anio} año`].includes(value as CURSO)), `${anio} año`]
        }
        return acc
      }, filterValue)
      return formatedFilterValues.map(value => { return { id: cursoFilter.id, value } })
    }
  }, [cursoFilter, coursesByYear])

  return (
    <div className='border w-full grid p-2 gap-y-2 bg-background/80'>
      <CursoFilter table={table} />
      {filterValues !== undefined && (
        <>
          <Separator />
          <FilterBox
            title='Cursos'
            filterValues={filterValues}
            handleBoxClick={() => table.getColumn(filterValues[0].id)?.setFilterValue(undefined)}
            handleItemClick={(filter) => () => table.getColumn(filter.id)?.setFilterValue((prevState: string[]) => {
              const filterValue = filter.value as string
              const newState = coursesByYear[filterValue]
                ? prevState.filter(prevValue => !coursesByYear[filterValue].includes(prevValue as CURSO))
                : prevState.filter(prevValue => prevValue !== filterValue)
              return newState.length ? newState : undefined
            })}
          />
        </>
      )}
    </div>
  )
}

export default CursoFilterBox
