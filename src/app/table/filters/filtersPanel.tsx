import { Student } from '@/types'
import { Table } from '@tanstack/react-table'
import CursoFilter from './filterInputs/cursosFilter'
import MateriasFilter from './filterInputs/materiasFilter'
import CantidadesFilter from './filterInputs/cantidadesFilter'
import PromocionFilter from './filterInputs/promocionFilter'
import ColumnsVisibility from './filterInputs/columnsVisibility'
import CursoFilter2 from './filterInputs/cursosFilter copy'
import FiltersBox from './filtersBox/filtersBox'

interface FiltersPanelProps {
  table: Table<Student>
}

function FiltersPanel ({ table } : FiltersPanelProps) {
  const isTroncalesVisible = table.getColumn('troncales')?.getIsVisible()
  const isGeneralesVisible = table.getColumn('generales')?.getIsVisible()
  const isEnProceso2020Visible = table.getColumn('enProceso2020')?.getIsVisible()

  return (
    <div className='flex flex-col justify-start items-start gap-y-4 w-72'>
      <FiltersBox table={table} />
      <ColumnsVisibility className='ml-auto' table={table} />
      <CursoFilter2 table={table} />
      <CursoFilter table={table} />
      {(isTroncalesVisible || isGeneralesVisible || isEnProceso2020Visible) && (
        <>
          <CantidadesFilter table={table} />
          <MateriasFilter table={table} />
        </>
      )}
      {table.getColumn('promocion')?.getIsVisible() && <PromocionFilter table={table} />}
    </div>
  )
}

export default FiltersPanel
