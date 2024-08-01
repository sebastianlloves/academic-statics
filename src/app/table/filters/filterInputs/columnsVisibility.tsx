import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Student } from '@/types'
import { Table } from '@tanstack/react-table'
import { MateriasFilterState } from './materias/materiasFilter'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlignHorizontalDistributeCenter } from 'lucide-react'

interface ColumnsVisibilityProps {
  table: Table<Student>,
  className?: string
}

function ColumnsVisibility ({ table }: ColumnsVisibilityProps) {
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
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='w-min gap-x-3 font-medium shadow-sm py-2 tracking-wide justify-between px-3 rounded-lg'>
          <AlignHorizontalDistributeCenter strokeWidth='1.2px' size={15} />
          Columnas
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' alignOffset={-1} side='bottom' className='rounded-md p-1'>
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
    </DropdownMenu>
  )
}

export default ColumnsVisibility
