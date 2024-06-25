import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CURSO, CURSOS } from '@/constants'
import { Student } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

interface CursoFilterProps {
  table: Table<Student>
}

function CursoFilter ({ table }: CursoFilterProps) {
  const [cursoFilterValue, setCursoFilterValue] = useState<CURSO[]>([])
  const coursesData = useMemo(() => {
    const allCourses = Object.keys(CURSOS).flatMap(anio => CURSOS[Number(anio) as keyof(typeof CURSOS)].map(({ nombre }) => nombre))
    setCursoFilterValue(allCourses)
    const coursesByYear = Object.fromEntries(Object.keys(CURSOS).map(anio => [`${anio}° año`, CURSOS[Number(anio) as keyof(typeof CURSOS)].map(({ nombre }) => nombre)]))
    return { ...coursesByYear, all: allCourses }
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>Curso<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='p-2'>
        <DropdownMenuCheckboxItem
          className='cursor-pointer font-semibold text-foreground'
          checked={JSON.stringify(cursoFilterValue) === JSON.stringify(coursesData.all)}
          onCheckedChange={() => {
            const newState = JSON.stringify(cursoFilterValue) === JSON.stringify(coursesData.all) ? [] : coursesData.all
            setCursoFilterValue(newState)
            table.getColumn('curso')?.setFilterValue(newState)
          }}
          onSelect={(e) => e.preventDefault()}
        >
          Todos
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {
          Object.keys(CURSOS).map(anio => (
            <DropdownMenuSub key={anio}>
              <DropdownMenuSubTrigger>
                {`${anio}° año`}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent sideOffset={10}>
                  {CURSOS[Number(anio) as keyof(typeof CURSOS)].map(objCurso => {
                    const { nombre } = objCurso
                    return (
                      <DropdownMenuCheckboxItem
                        key={nombre}
                        className='cursor-pointer'
                        checked={cursoFilterValue.includes(nombre)}
                        onCheckedChange={() => {
                          const newState = cursoFilterValue.includes(nombre) ? [...cursoFilterValue].filter(course => course !== nombre) : [...cursoFilterValue, nombre]
                          setCursoFilterValue(newState)
                          table.getColumn('curso')?.setFilterValue(newState)
                        }}
                        onSelect={(e) => e.preventDefault()}
                      >
                        {nombre}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    className='cursor-pointer font-semibold text-foreground'
                    checked={coursesData[(`${anio}° año`) as keyof typeof coursesData].every(course => cursoFilterValue.includes(course))}
                    onCheckedChange={() => {
                      const allCoursesIncluded = coursesData[(`${anio}° año`) as keyof typeof coursesData].every(course => cursoFilterValue.includes(course))
                      const newState = allCoursesIncluded
                        ? [...cursoFilterValue].filter(course => !coursesData[(`${anio}° año`) as keyof typeof coursesData].includes(course))
                        : [...cursoFilterValue, ...coursesData[(`${anio}° año`) as keyof typeof coursesData].filter(course => ![...cursoFilterValue].includes(course))].sort()
                      setCursoFilterValue(newState)
                      table.getColumn('curso')?.setFilterValue(newState)
                    }}
                    onSelect={(e) => e.preventDefault()}
                  >
                    Todos
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
