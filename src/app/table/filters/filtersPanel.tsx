import { Student } from '@/types'
import { Table } from '@tanstack/react-table'
import MateriasFilter from './filterInputs/materiasFilter'
import CantidadesFilter from './filterInputs/cantidadesFilter'
import PromocionFilter from './filterInputs/promocionFilter'
import ColumnsVisibility from './filterInputs/columnsVisibility'
import { ScrollArea } from '@/components/ui/scroll-area'
import CursosFilter1 from './filterInputs/cursosFilter'

interface FiltersPanelProps {
  table: Table<Student>
}

function FiltersPanel ({ table } : FiltersPanelProps) {
  const filtersValues = table.getState().columnFilters
  const cursoFilterValue = filtersValues.find(filtro => filtro.id === 'curso')

  const isTroncalesVisible = table.getColumn('troncales')?.getIsVisible()
  const isGeneralesVisible = table.getColumn('generales')?.getIsVisible()
  const isEnProceso2020Visible = table.getColumn('enProceso2020')?.getIsVisible()

  return (
    <ScrollArea className='rounded-lg border bg-background'>
      <div className='flex flex-col justify-start items-start gap-4 w-64 max-w-64 p-2'>
        <ColumnsVisibility className='ml-auto' table={table} />
        {/* <CursoFilter2 table={table} /> */}
        <CursosFilter1 table={table} />
        {/* {cursoFilterValue && <CursoFilterBox filter={cursoFilterValue} table={table} />} */}
        {(isTroncalesVisible || isGeneralesVisible || isEnProceso2020Visible) && (
          <>
            <CantidadesFilter table={table} />
            <MateriasFilter table={table} />
          </>
        )}
        {table.getColumn('promocion')?.getIsVisible() && <PromocionFilter table={table} />}
        {/* <FiltersBox table={table} /> */}
      </div>
    </ScrollArea>
  )
}

export default FiltersPanel
