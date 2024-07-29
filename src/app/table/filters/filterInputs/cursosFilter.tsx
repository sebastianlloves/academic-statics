import { DropdownMenuCheckboxItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'
import { CURSOS } from '@/constants'
import { CURSO, Student } from '@/types'
import { Table } from '@tanstack/react-table'
import { useMemo } from 'react'
import Item from './item'
import LabelsBox from '../activeFilters/labelsBox'
import DropdownFilter from '../dropdownFilter'

interface CursosFilterProps {
  table: Table<Student>
}

function CursosFilter ({ table }: CursosFilterProps) {
  const coursesByYear = useMemo(() =>
    Object.fromEntries(Object.keys(CURSOS)
      .map(anio => [`${anio}° año`, CURSOS[Number(anio) as keyof(typeof CURSOS)]
        .map(({ nombre }) => nombre)]))
  , [])

  const cursoFilter = table.getState().columnFilters.find(filtro => filtro.id === 'curso')
  const facets = table.getColumn('curso')?.getFacetedUniqueValues()
  const formatedFilters = useMemo(() => {
    console.log('CursosFilter memo')
    if (cursoFilter !== undefined) {
      const filterLabels = (cursoFilter.value as string[]).reduce((acc, newValue) => {
        const anio = newValue.split(' ')[0]
        if (coursesByYear[`${anio} año`].every(curso => acc.includes(curso))) {
          return [...acc.filter(value => !coursesByYear[`${anio} año`].includes(value as CURSO)), `${anio} año`]
        }
        return acc
      }, (cursoFilter.value as string[]))
      return filterLabels.map(label => {
        return {
          id: cursoFilter.id,
          label,
          value: label.includes(' año') ? [...coursesByYear[label]] : [label],
          quantity: label.includes(' año') ? coursesByYear[label].reduce((acc, newValue) => acc + (facets?.get(newValue) || 0), 0) : (facets?.get(label) || 0)
        }
      })
    }
    return []
  }, [coursesByYear, cursoFilter, facets])

  const cursoFilterValues = formatedFilters.flatMap(formatedFilter => formatedFilter.value)

  return (
    <div className='border rounded-lg w-full shadow-sm'>
      <DropdownFilter title='Cursos'>
        {
          Object.keys(coursesByYear).map(anio => {
            const anioCantidad = (facets && Array.from(facets)
              .filter(([curso]) => curso.slice(0, 2) === anio.split(' año')[0])
              .reduce((acc, [, newValueCantidad]) => acc + newValueCantidad, 0)) || 0
            return (
              <DropdownMenuSub key={anio}>
                <DropdownMenuSubTrigger className='pl-3'>
                  {anio}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent alignOffset={-5} sideOffset={6}>
                    {coursesByYear[anio].map(curso => {
                      const cantidad = facets?.get(curso) || 0
                      return (
                        <DropdownMenuCheckboxItem
                          key={curso}
                          className='cursor-pointer'
                          checked={cursoFilterValues.includes(curso)}
                          onSelect={(e) => e.preventDefault()}
                          onCheckedChange={(checked) => {
                            const newCursosState = !checked
                              ? cursoFilterValues.filter(prevCurso => prevCurso !== curso)
                              : [...cursoFilterValues, curso]
                            table.getColumn('curso')?.setFilterValue(newCursosState.length ? newCursosState : undefined)
                          }}
                        >
                          <Item value={curso} quantity={cantidad} />
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      className='cursor-pointer font-medium text-foreground'
                      onSelect={(e) => e.preventDefault()}
                      checked={coursesByYear[anio].every(course => cursoFilterValues.includes(course))}
                      onCheckedChange={(checked) => {
                        const newCursosState = !checked
                          ? cursoFilterValues.filter(curso => !coursesByYear[anio].includes(curso as CURSO))
                          : Array.from(new Set([...cursoFilterValues, ...coursesByYear[anio]]))
                        table.getColumn('curso')?.setFilterValue(newCursosState)
                      }}
                    >
                      <Item value={`Todos los ${anio.split(' año')[0]}`} quantity={anioCantidad} />
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            )
          })
        }
      </DropdownFilter>
      <LabelsBox
        filterValues={formatedFilters}
        maxLabels={4}
        handleBoxClick={() => table.getColumn(formatedFilters[0].id)?.setFilterValue(undefined)}
        handleItemClick={(filter) => () => table.getColumn(filter.id)?.setFilterValue((prevState: string[]) => {
          const newState = prevState.filter(prevValue => !filter.value.includes(prevValue))
          return newState.length ? newState : undefined
        })}
      />
    </div>
  )
}

export default CursosFilter
