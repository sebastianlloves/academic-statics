import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ANIO, Student } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useMemo } from 'react'
import { MATERIAS_POR_CURSO } from '@/constants'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface MateriasFilterProps {
  table: Table<Student>
}

export interface MateriasFilterState {
  includeEnProceso2020?: boolean,
  strictInclusion?: boolean,
  subjects: string[]
}

function MateriasFilter ({ table } : MateriasFilterProps) {
  const materiasFilter = (table.getColumn('expand')?.getFilterValue() || { subjects: [] }) as MateriasFilterState

  const allSubjects : {[key: string]: string[]} = useMemo(() => {
    const entriesSubjectsObject = Object.keys(MATERIAS_POR_CURSO).map(anio => {
      const subjectsByAnio = MATERIAS_POR_CURSO[Number(anio) as ANIO].map(objSubject => `${objSubject.nombre} (${anio}°)`)
      return [`${anio}° año`, subjectsByAnio]
    })
    return Object.fromEntries(entriesSubjectsObject)
  }, [])

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>Materias<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' /></Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='p-1'>
        {Object.keys(allSubjects).map(anio => (
          <DropdownMenuSub key={anio}>
            <DropdownMenuSubTrigger className='pl-3'>
              {anio}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent sideOffset={6}>
                {allSubjects[anio].map((subject:string) => (
                  <DropdownMenuCheckboxItem
                    onSelect={e => e.preventDefault()}
                    key={subject}
                    className='cursor-pointer'
                    checked={materiasFilter.subjects.includes(subject)}
                    onCheckedChange={(checked) => {
                      const newSubjectsState = !checked
                        ? materiasFilter.subjects.filter(prevSubject => prevSubject !== subject)
                        : [...materiasFilter.subjects, subject]
                      table.getColumn('expand')?.setFilterValue({ ...materiasFilter, subjects: newSubjectsState })
                    }}
                  >
                    {subject.split(' (')[0]}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  onSelect={e => e.preventDefault()}
                  className='cursor-pointer font-medium text-foreground pr-4'
                  checked={allSubjects[anio].every(subject => materiasFilter.subjects.includes(subject))}
                  onCheckedChange={(checked) => {
                    const newSubjectState = !checked
                      ? materiasFilter.subjects.filter(prevSubject => !allSubjects[anio].includes(prevSubject))
                      : Array.from(new Set([...materiasFilter.subjects, ...allSubjects[anio]]))
                    table.getColumn('expand')?.setFilterValue({ ...materiasFilter, subjects: newSubjectState })
                  }}
                >
                  {`Todas las materias de ${anio}`}
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <div className='flex items-center space-x-6 p-1'>
            <Label
              htmlFor='estrict-inclusion'
              className='cursor-pointer font-normal text-foreground'
            >Inclusión estricta
            </Label>
            <Switch
              id='estrict-inclusion'
              className='w-8 h-4'
              disabled={materiasFilter.subjects.length <= 1}
              checked={materiasFilter.strictInclusion && materiasFilter.subjects.length > 1}
              onCheckedChange={() => table.getColumn('expand')?.setFilterValue({ ...materiasFilter, strictInclusion: !materiasFilter.strictInclusion })}
            />
          </div>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MateriasFilter
