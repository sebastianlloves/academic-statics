import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CURSOS } from '@/constants'
import { CURSO, Student } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

interface CursoFilterProps {
  table: Table<Student>
}

function CursoFilter ({ table }: CursoFilterProps) {
  const coursesByYear = useMemo(
    () => Object.fromEntries(Object.keys(CURSOS).map(anio => [`${anio}° año`, CURSOS[Number(anio) as keyof(typeof CURSOS)].map(({ nombre }) => nombre)])), [])
  const [cursoFilter, setCursoFilter] = useState<CURSO[] | 'all'>('all')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>Cursos<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' /></Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='p-1'>
        {
          Object.keys(coursesByYear).map(anio => (
            <DropdownMenuSub key={anio}>
              <DropdownMenuSubTrigger className='pl-3'>
                {anio}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent sideOffset={6}>
                  {coursesByYear[anio].map(curso => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={curso}
                        className='cursor-pointer'
                        checked={cursoFilter.includes(curso)}
                        onSelect={(e) => e.preventDefault()}
                        onCheckedChange={(checked) => {
                          let newState
                          if (cursoFilter === 'all') newState = [curso]
                          else {
                            const newCursosArr = !checked
                              ? cursoFilter.filter(prevCurso => prevCurso !== curso)
                              : [...cursoFilter, curso]
                            newState = newCursosArr.length === 0 ? ('all' as const) : newCursosArr
                          }
                          setCursoFilter(newState)
                          table.getColumn('curso')?.setFilterValue(newState)
                        }}
                      >
                        {curso}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    className='cursor-pointer font-medium text-foreground pr-4'
                    onSelect={(e) => e.preventDefault()}
                    checked={coursesByYear[anio].every(course => cursoFilter.includes(course))}
                    onCheckedChange={(checked) => {
                      let newState
                      if (cursoFilter === 'all') newState = coursesByYear[anio]
                      else {
                        const newCursosArr = !checked
                          ? cursoFilter.filter(curso => !coursesByYear[anio].includes(curso))
                          : Array.from(new Set([...cursoFilter, ...coursesByYear[anio]]))
                        newState = newCursosArr.length === 0 ? ('all' as const) : newCursosArr
                      }
                      setCursoFilter(newState)
                      table.getColumn('curso')?.setFilterValue(newState)
                    }}
                  >
                    {`Todos los ${anio.split(' año')[0]}`}
                  </DropdownMenuCheckboxItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CursoFilter
