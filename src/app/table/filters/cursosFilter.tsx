import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { ANIOS, CURSO, CURSOS } from '@/constants'
import { Student } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useState } from 'react'

interface CursoFilterProps {
  table: Table<Student>
}

function CursoFilter ({ table }: CursoFilterProps) {
  const allCourses = Object.keys(CURSOS).flatMap(anio => CURSOS[Number(anio) as keyof(typeof CURSOS)].map(({ nombre }) => nombre))
  const [cursoFilterValue, setCursoFilterValue] = useState<CURSO[] | 'all'>(allCourses)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>Curso<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='p-2'>
        <DropdownMenuCheckboxItem checked>Todos</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {
          Object.keys(CURSOS).map(anio => (
            <DropdownMenuSub key={anio}>
              <DropdownMenuSubTrigger>
                {`${anio}° año`}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {CURSOS[Number(anio) as keyof(typeof CURSOS)].map(objCurso => {
                    const { nombre } = objCurso
                    return (
                      <DropdownMenuCheckboxItem checked={cursoFilterValue === 'all' || cursoFilterValue.includes(nombre)} key={nombre}>{nombre}</DropdownMenuCheckboxItem>
                    )
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem>Todos</DropdownMenuCheckboxItem>
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
