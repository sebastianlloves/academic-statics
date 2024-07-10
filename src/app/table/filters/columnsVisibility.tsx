import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Student } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { MateriasFilterState } from './materiasFilter'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ColumnsVisibilityProps {
  table: Table<Student>,
  className?: string
}

function ColumnsVisibility ({ table, className }: ColumnsVisibilityProps) {
  const columns = table.getAllColumns().filter(column => column.getCanHide() && column.id !== 'expand')
  const isTroncalesVisible = table.getColumn('troncales')?.getIsVisible()
  const isGeneralesVisible = table.getColumn('generales')?.getIsVisible()
  const isEnProceso2020Visible = table.getColumn('enProceso2020')?.getIsVisible()

  useEffect(() => {
    const hideExpandColumn = !isTroncalesVisible && !isGeneralesVisible && !isEnProceso2020Visible
    table.getColumn('expand')?.toggleVisibility(!hideExpandColumn)
  }, [isTroncalesVisible, isGeneralesVisible, isEnProceso2020Visible, table])

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild className='w-fit'>
        <Button
          variant='outline'
          className={cn(className, 'font-normal')}
        >Columnas<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='p-1'>
        {
          columns.map(column => {
            const { title } = column.columnDef.meta ?? {}
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize pr-3 cursor-pointer'
                onSelect={e => e.preventDefault()}
                checked={column.getIsVisible()}
                onCheckedChange={() => {
                  if (column.id === 'enProceso2020') {
                    table.getColumn('expand')?.setFilterValue((prevValue: MateriasFilterState | undefined) => {
                      if (prevValue) return { ...prevValue, includeEnProceso2020: !column.getIsVisible() }
                    })
                  }
                  column.toggleVisibility()
                }}
              >
                {title || column.id}
              </DropdownMenuCheckboxItem>
            )
          })
        }
      </DropdownMenuContent>

      {/* <DropdownMenuContent align='start' className='p-1'>
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
                    checked={materiasFilter.subjects !== 'all' && materiasFilter.subjects.includes(subject)}
                    onCheckedChange={(checked) => {
                      let newState
                      if (materiasFilter.subjects === 'all') newState = { ...materiasFilter, subjects: [subject] }
                      else {
                        const newSubjectState = !checked
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
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  onSelect={e => e.preventDefault()}
                  className='cursor-pointer font-medium text-foreground pr-4'
                  checked={materiasFilter.subjects !== 'all' && allSubjects[anio].every(subject => materiasFilter.subjects.includes(subject))}
                  onCheckedChange={(checked) => {
                    let newState
                    if (materiasFilter.subjects === 'all') newState = { ...materiasFilter, subjects: allSubjects[anio] }
                    else {
                      const newSubjectState = !checked
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
        ))}

      </DropdownMenuContent> */}
    </DropdownMenu>
  )
}

export default ColumnsVisibility
