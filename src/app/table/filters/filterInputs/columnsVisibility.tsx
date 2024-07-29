import { DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu'
import { Student } from '@/types'
import { Table } from '@tanstack/react-table'
import { MateriasFilterState } from './materiasFilter'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import DropdownFilter from '../dropdownFilter'

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
    <div className={cn(className)}>
      <DropdownFilter title='Columnas'>
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
      </DropdownFilter>
    </div>
  )
}

export default ColumnsVisibility
