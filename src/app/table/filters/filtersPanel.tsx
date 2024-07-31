import { Student } from '@/types'
import { Table } from '@tanstack/react-table'
import MateriasFilter from './filterInputs/materias/materiasFilter'
import PromocionFilter from './filterInputs/promocion/promocionFilter'
import ColumnsVisibility from './filterInputs/columnsVisibility'
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
    <ScrollArea className='rounded-lg border bg-background'>
      <div className='flex flex-col justify-start items-start gap-y-6 w-[17rem] max-w-[17rem] py-4 px-2'>
        <div className='flex justify-start items-center gap-x-6 px-2 w-1/2'>
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
        <ColumnsVisibility className='ml-auto bg-success text-success-foreground' table={table} />
      </div>
    </ScrollArea>
  )
}

export default FiltersPanel
