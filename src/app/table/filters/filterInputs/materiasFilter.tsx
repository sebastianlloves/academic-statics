import { DropdownMenuCheckboxItem, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'
import { ANIO, Student } from '@/types'
import { Table } from '@tanstack/react-table'
import { useMemo } from 'react'
import { MATERIAS_POR_CURSO } from '@/constants'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Item from './item'
import Filter from '../filter'

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
  const facets = table.getColumn('expand')?.getFacetedUniqueValues()

  const allSubjects : {[key: string]: string[]} = useMemo(() => {
    const entriesSubjectsObject = Object.keys(MATERIAS_POR_CURSO).map(anio => {
      const subjectsByAnio = MATERIAS_POR_CURSO[Number(anio) as ANIO].map(objSubject => `${objSubject.nombre} (${anio}°)`)
      return [`${anio}° año`, subjectsByAnio]
    })
    return Object.fromEntries(entriesSubjectsObject)
  }, [])

  return (
    <Filter title='Materias'>

      {Object.keys(allSubjects).map(anio => (
        <DropdownMenuSub key={anio}>
          <DropdownMenuSubTrigger className='pl-3'>
            {anio}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={6}>
              {allSubjects[anio].map((subject:string) => {
                const quantity = materiasFilter.strictInclusion
                  ? table.getRowModel().rows.filter(row => {
                    const troncales = row.original.detalleTroncales || []
                    const generales = row.original.detalleGenerales || []
                    const enProceso2020 = (table.getColumn('enProceso2020')?.getIsVisible() && row.original.materiasEnProceso2020?.detalle) || []
                    return [...troncales, ...generales, ...enProceso2020].includes(subject)
                  }).length
                  : facets?.get(subject) ?? 0
                return (
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
                    <Item value={subject.split(' (')[0]} quantity={quantity} />
                  </DropdownMenuCheckboxItem>
                )
              }
              )}
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
            checked={materiasFilter.strictInclusion}
            onCheckedChange={() => table.getColumn('expand')?.setFilterValue({ ...materiasFilter, strictInclusion: !materiasFilter.strictInclusion })}
          />
        </div>
      </DropdownMenuItem>

    </Filter>
  )
}

export default MateriasFilter
