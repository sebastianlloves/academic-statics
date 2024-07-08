import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ANIO, Student } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { MATERIAS_POR_CURSO } from '@/constants'

interface MateriasFilterProps {
  table: Table<Student>
}

export interface materiasFilterState {
  includeEnProceso2020: boolean,
  includesAll: boolean,
  subjects: string[] | 'all'
}

function MateriasFilter ({ table } : MateriasFilterProps) {
  const [materiasFilter, setMateriasFilter] = useState<materiasFilterState>({ includesAll: false, subjects: 'all', includeEnProceso2020: table.getColumn('enProceso2020')?.getIsVisible() || false })

  const allSubjects : {[key: string]: string[]} = useMemo(() => {
    const entriesSubjectsObject = Object.keys(MATERIAS_POR_CURSO).map(anio => {
      const subjectsByAnio = MATERIAS_POR_CURSO[Number(anio) as ANIO].map(objSubject => `${objSubject.nombre} (${anio}°)`)
      return [`${anio}° año`, subjectsByAnio]
    })
    const subjects = Object.fromEntries(entriesSubjectsObject)
    return subjects
  }, [])
  console.log(materiasFilter.subjects)
  console.log(table.getColumn('expand')?.getFilterValue())

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>Materias<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' /></Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='p-3'>
        {
                Object.keys(allSubjects).map(anio => (
                  <DropdownMenuSub key={anio}>
                    <DropdownMenuSubTrigger>
                      {anio}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent sideOffset={6}>
                        {
                          allSubjects[anio].map((subject:string) => (
                            <DropdownMenuCheckboxItem
                              onSelect={e => e.preventDefault()}
                              key={subject}
                              className='cursor-pointer'
                              checked={materiasFilter.subjects !== 'all' && materiasFilter.subjects.includes(subject)}
                              onCheckedChange={() => {
                                let newState
                                if (materiasFilter.subjects === 'all') newState = { ...materiasFilter, subjects: [subject] }
                                else {
                                  const isAlreadyIncluded = materiasFilter.subjects.includes(subject)
                                  const newSubjectState = isAlreadyIncluded
                                    ? materiasFilter.subjects.filter(prevSubject => prevSubject !== subject)
                                    : [...materiasFilter.subjects, subject]
                                  newState = newSubjectState.length === 0 ? { ...materiasFilter, subjects: ('all' as const) } : { ...materiasFilter, subjects: newSubjectState }
                                }
                                setMateriasFilter(newState)
                                table.getColumn('expand')?.setFilterValue(newState)
                              }}
                            >
                              {subject.split(' (')[0]}
                            </DropdownMenuCheckboxItem>
                          ))
                      }
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                          onSelect={e => e.preventDefault()}
                          className='cursor-pointer font-medium text-foreground pr-3'
                          checked={materiasFilter.subjects !== 'all' && allSubjects[anio].every(subject => materiasFilter.subjects.includes(subject))}
                          onCheckedChange={() => {
                            let newState
                            if (materiasFilter.subjects === 'all') newState = { ...materiasFilter, subjects: allSubjects[anio] }
                            else {
                              const isAlreadyIncluded = allSubjects[anio].every(subject => materiasFilter.subjects.includes(subject))
                              const newSubjectState = isAlreadyIncluded
                                ? materiasFilter.subjects.filter(prevSubject => !allSubjects[anio].includes(prevSubject))
                                : Array.from(new Set([...materiasFilter.subjects, ...allSubjects[anio]]))
                              newState = newSubjectState.length === 0 ? { ...materiasFilter, subjects: ('all' as const) } : { ...materiasFilter, subjects: newSubjectState }
                            }
                            setMateriasFilter(newState)
                            table.getColumn('expand')?.setFilterValue(newState)
                          }}
                        >
                          {`Todas las materias de ${anio}`}
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

export default MateriasFilter
