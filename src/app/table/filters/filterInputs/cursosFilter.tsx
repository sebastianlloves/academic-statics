import { DropdownMenuCheckboxItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'
import { CURSOS } from '@/constants'
import { CURSO, Student } from '@/types'
import { Table } from '@tanstack/react-table'
import { useMemo } from 'react'
import Item from './item'
import Filter from '../filter'

interface CursoFilterProps {
  table: Table<Student>
}

function CursoFilter ({ table }: CursoFilterProps) {
  const coursesByYear = useMemo(() =>
    Object.fromEntries(Object.keys(CURSOS)
      .map(anio => [`${anio}° año`, CURSOS[Number(anio) as keyof(typeof CURSOS)]
        .map(({ nombre }) => nombre)]))
  , [])
  const cursosFilter = (table.getColumn('curso')?.getFilterValue() || []) as CURSO[]

  const facets = table.getColumn('curso')?.getFacetedUniqueValues()

  return (
    <Filter title='Curso'>
      {
          Object.keys(coursesByYear).map(anio => (
            <DropdownMenuSub key={anio}>
              <DropdownMenuSubTrigger className='pl-3'>
                {anio}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent sideOffset={6}>
                  {coursesByYear[anio].map(curso => {
                    const cantidad = facets?.get(curso) || 0
                    return (
                      <DropdownMenuCheckboxItem
                        key={curso}
                        className='cursor-pointer'
                        checked={cursosFilter.includes(curso)}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(checked) => {
                          const newCursosState = !checked
                            ? cursosFilter.filter(prevCurso => prevCurso !== curso)
                            : [...cursosFilter, curso]
                          table.getColumn('curso')?.setFilterValue(newCursosState.length ? newCursosState : undefined)
                        }}
                      >
                        <Item value={curso} quantity={cantidad} />
                      </DropdownMenuCheckboxItem>
                    )
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    className='cursor-pointer font-medium text-foreground pr-4'
                    onSelect={(e) => e.preventDefault()}
                    checked={coursesByYear[anio].every(course => cursosFilter.includes(course))}
                    onCheckedChange={(checked) => {
                      const newCursosState = !checked
                        ? cursosFilter.filter(curso => !coursesByYear[anio].includes(curso))
                        : Array.from(new Set([...cursosFilter, ...coursesByYear[anio]]))
                      table.getColumn('curso')?.setFilterValue(newCursosState)
                    }}
                  >
                    {`Todos los ${anio.split(' año')[0]}`}
                  </DropdownMenuCheckboxItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))
        }
    </Filter>
  )
}

export default CursoFilter
