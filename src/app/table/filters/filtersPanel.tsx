import { Student } from '@/types'
import { Table } from '@tanstack/react-table'
import MateriasFilter from './filterInputs/materias/materiasFilter'
import PromocionFilter from './filterInputs/promocion/promocionFilter'
import { ScrollArea } from '@/components/ui/scroll-area'
import CursosFilter from './filterInputs/cursos/cursosFilter'
import CantidadesFilter from './filterInputs/cantidades/cantidadesFilter'
import { ListFilter } from 'lucide-react'

interface FiltersPanelProps {
  table: Table<Student>
}

function FiltersPanel ({ table } : FiltersPanelProps) {
  const isTroncalesVisible = table.getColumn('troncales')?.getIsVisible()
  const isGeneralesVisible = table.getColumn('generales')?.getIsVisible()
  const isEnProceso2020Visible = table.getColumn('enProceso2020')?.getIsVisible()

  return (
    <ScrollArea className='rounded-lg border bg-background shadow-sm'>
      <div className='flex flex-col justify-start items-start gap-y-4 py-4 px-2'>
        <div className='flex justify-start items-center gap-x-6 px-2 w-1/2 mb-6'>
          <ListFilter size={16} />
          <h4 className='scroll-m-20 text-lg font-semibold tracking-tight'>Filtros</h4>
        </div>
        <CursosFilter table={table} />
        {(isTroncalesVisible || isGeneralesVisible || isEnProceso2020Visible) &&
        (
          <>
            <MateriasFilter table={table} />
            <CantidadesFilter table={table} />
          </>
        )}
        {table.getColumn('promocion')?.getIsVisible() && <PromocionFilter table={table} />}
      </div>
    </ScrollArea>
  )
}

export default FiltersPanel
