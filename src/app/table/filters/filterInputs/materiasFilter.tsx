import { DropdownMenuCheckboxItem, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'
import { Student } from '@/types'
import { Table } from '@tanstack/react-table'
import { useMemo } from 'react'
import { allSubjects } from '@/constants'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Item from './item'
import DropdownFilter from '../dropdownFilter'
import LabelsBox from '../activeFilters/labelsBox'

interface MateriasFilterProps {
  table: Table<Student>
}

export interface MateriasFilterState {
  includeEnProceso2020?: boolean,
  strictInclusion?: boolean,
  subjects: string[]
}

function MateriasFilter ({ table } : MateriasFilterProps) {
  const facets = table.getColumn('expand')?.getFacetedUniqueValues()
  const materiasFilter = table.getState().columnFilters.find(filtro => filtro.id === 'expand')

  const formatedFilters = useMemo(() => {
    console.log('MateriasFilter memo')
    if (materiasFilter !== undefined) {
      const filter = (materiasFilter.value as MateriasFilterState)
      const filterLabels = filter.subjects.reduce((acc, newValue) => {
        const anio = `${newValue.split('(')[1].split(')')[0]} año`
        if (allSubjects[anio].every(materia => acc.includes(materia))) {
          return [...acc.filter(materia => !allSubjects[anio].includes(materia)), `Todas las materias de ${anio}`]
        }
        return acc
      }, filter.subjects)
      const formatedFilters = filterLabels.map(label => {
        return {
          id: materiasFilter.id,
          label,
          value: label.includes(' año') ? [...(allSubjects[label.split('Todas las materias de ')[1]])] : [label],
          quantity: !label.includes(' año') ? (facets?.get(label) || 0) : undefined
        }
      })
      return filter.strictInclusion ? [...formatedFilters, { id: materiasFilter.id, label: 'Inclusión estricta', value: ['Inclusión estricta'] }] : formatedFilters
    }
    return []
  }, [materiasFilter, facets])

  const materiasFilterValues = formatedFilters.flatMap(formatedFilter => formatedFilter.value)
  /* console.log(materiasFilter)
  console.log(formatedFilters) */

  return (
    <div className='border rounded-lg w-full shadow-sm'>
      <DropdownFilter title='Materias'>

        {Object.keys(allSubjects).map(anio => (
          <DropdownMenuSub key={anio}>
            <DropdownMenuSubTrigger className='pl-3'>
              {anio}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent sideOffset={6}>
                {allSubjects[anio].map((subject:string) => {
                  const quantity = materiasFilter !== undefined && (materiasFilter?.value as MateriasFilterState).strictInclusion
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
                      checked={materiasFilterValues.includes(subject)}
                      onCheckedChange={() => {
                        if (materiasFilter === undefined) table.getColumn('expand')?.setFilterValue({ subjects: [subject] })
                        else {
                          const filterValue = materiasFilter.value as MateriasFilterState
                          const newSubjectsState = materiasFilterValues.includes(subject)
                            ? filterValue.subjects.filter(prevSubject => prevSubject !== subject)
                            : [...filterValue.subjects, subject]
                          table.getColumn('expand')?.setFilterValue({ ...filterValue, subjects: newSubjectsState })
                        }
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
                  checked={allSubjects[anio].every(subject => materiasFilterValues.includes(subject))}
                  onCheckedChange={() => {
                    if (materiasFilter === undefined) table.getColumn('expand')?.setFilterValue({ subjects: [...allSubjects[anio]] })
                    else {
                      const filterValue = materiasFilter.value as MateriasFilterState
                      const newSubjectState = allSubjects[anio].every(subject => materiasFilterValues.includes(subject))
                        ? filterValue.subjects.filter(prevSubject => !allSubjects[anio].includes(prevSubject))
                        : Array.from(new Set([...filterValue.subjects, ...allSubjects[anio]]))
                      table.getColumn('expand')?.setFilterValue({ ...filterValue, subjects: newSubjectState })
                    }
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
              checked={materiasFilterValues.includes('Inclusión estricta')}
              onCheckedChange={() => table.getColumn('expand')?.setFilterValue(() => {
                if (materiasFilter === undefined) return { strictInclusion: true, subjects: [] }
                else {
                  const filterValue = materiasFilter.value as MateriasFilterState
                  return { ...filterValue, strictInclusion: !filterValue.strictInclusion }
                }
              })}
            />
          </div>
        </DropdownMenuItem>
      </DropdownFilter>
      <LabelsBox
        filterValues={formatedFilters}
        maxLabels={4}
        handleBoxClick={() => table.getColumn(formatedFilters[0].id)?.setFilterValue(undefined)}
        handleItemClick={(filter) => () => table.getColumn(filter.id)?.setFilterValue((prevState: MateriasFilterState) => {
          if (filter.label === 'Inclusión estricta') return { ...prevState, strictInclusion: false }
          const newSubjectsState = prevState.subjects.filter((prevValue) => {
            if (filter.label.includes(' año')) return !allSubjects[filter.label.split('Todas las materias de ')[1]].includes(prevValue)
            return !filter.value.includes(prevValue)
          })
          return newSubjectsState.length ? { ...prevState, subjects: newSubjectsState } : undefined
        })}
      />
    </div>
  )
}

export default MateriasFilter
