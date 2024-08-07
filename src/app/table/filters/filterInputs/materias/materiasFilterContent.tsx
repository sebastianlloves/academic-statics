import { DropdownMenuCheckboxItem, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'
import Item from '../item'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { allSubjects } from '@/constants'
import { MateriasFilterProps, MateriasFilterState } from './materiasFilter'

function MateriasFilterContent ({ table, materiasFilter, facets }: MateriasFilterProps) {
  return (
    <>
      {Object.keys(allSubjects).map(anio => (
        <DropdownMenuSub key={anio}>
          <DropdownMenuSubTrigger className='pl-3'>
            {anio}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent alignOffset={-5} sideOffset={6}>
              {allSubjects[anio].map((subject:string) => {
                const quantity = (materiasFilter?.value as MateriasFilterState)?.strictInclusion
                  ? table.getRowModel().rows.filter(row => {
                    const troncales = row.original.detalleTroncales || []
                    const generales = row.original.detalleGenerales || []
                    const enProceso2020 = (table.getColumn('enProceso2020')?.getIsVisible() && row.original.detalleEnProceso2020) || []
                    return [...troncales, ...generales, ...enProceso2020].includes(subject)
                  }).length
                  : facets?.get(subject) ?? 0
                return (
                  <DropdownMenuCheckboxItem
                    onSelect={e => e.preventDefault()}
                    key={subject}
                    className='cursor-pointer'
                    checked={(materiasFilter?.value as MateriasFilterState)?.subjects.includes(subject)}
                    onCheckedChange={() => {
                      if (materiasFilter === undefined) table.getColumn('expand')?.setFilterValue({ subjects: [subject] })
                      else {
                        const filterValue = materiasFilter.value as MateriasFilterState
                        const newSubjectsState = (materiasFilter?.value as MateriasFilterState)?.subjects.includes(subject)
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
                checked={allSubjects[anio].every(subject => (materiasFilter?.value as MateriasFilterState)?.subjects.includes(subject))}
                onCheckedChange={() => {
                  if (materiasFilter === undefined) table.getColumn('expand')?.setFilterValue({ subjects: [...allSubjects[anio]] })
                  else {
                    const filterValue = materiasFilter.value as MateriasFilterState
                    const newSubjectState = allSubjects[anio].every(subject => (materiasFilter?.value as MateriasFilterState)?.subjects.includes(subject))
                      ? filterValue.subjects.filter(prevSubject => !allSubjects[anio].includes(prevSubject))
                      : Array.from(new Set([...filterValue.subjects, ...allSubjects[anio]]))
                    table.getColumn('expand')?.setFilterValue(newSubjectState.length === 0 && !filterValue.strictInclusion ? undefined : { ...filterValue, subjects: newSubjectState })
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
            checked={(materiasFilter?.value as MateriasFilterState)?.subjects.includes('Inclusión estricta')}
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
    </>
  )
}

export default MateriasFilterContent
