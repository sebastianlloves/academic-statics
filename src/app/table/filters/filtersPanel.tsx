import { Student } from '@/types'
import { Table } from '@tanstack/react-table'
import CursoFilter from './cursosFilter'
import MateriasFilter from './materiasFilter'
import CantidadesFilter from './cantidadesFilter'
import PromocionFilter from './promocionFilter'
import ColumnsVisibility from './columnsVisibility'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface FiltersPanelProps {
  table: Table<Student>
}

function FiltersPanel ({ table } : FiltersPanelProps) {
  const isTroncalesVisible = table.getColumn('troncales')?.getIsVisible()
  const isGeneralesVisible = table.getColumn('generales')?.getIsVisible()
  const isEnProceso2020Visible = table.getColumn('enProceso2020')?.getIsVisible()

  return (
    <div className='flex flex-col justify-start items-start gap-y-4  border min-w-64'>
      <ColumnsVisibility className='ml-auto' table={table} />
      <CursoFilter table={table} />
      {(isTroncalesVisible || isGeneralesVisible || isEnProceso2020Visible) && (
        <>
          <CantidadesFilter table={table} />
          <MateriasFilter table={table} />
        </>
      )}
      {table.getColumn('promocion')?.getIsVisible() && <PromocionFilter table={table} />}
      {table.getFilteredRowModel().rows.length < table.getCoreRowModel().rows.length && (
        <Button
          variant='secondary'
          className='flex items-center gap-x-3'
          onClick={() => table.resetColumnFilters()}
        >Resetear filtros<X size={12} />
        </Button>
      )}
    </div>
  )
}

export default FiltersPanel
