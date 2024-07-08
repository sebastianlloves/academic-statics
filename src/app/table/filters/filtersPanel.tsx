import { Student } from '@/types'
import { Table } from '@tanstack/react-table'
import CursoFilter from './cursosFilter'
import MateriasFilter from './materiasFilter'
import CantidadesFilter from './cantidadesFilter'
import PromocionFilter from './promocionFilter'
import ColumnsVisibility from './columnsVisibility'

interface FiltersPanelProps {
  table: Table<Student>
}

function FiltersPanel ({ table } : FiltersPanelProps) {
  return (
    <div className='flex items-center gap-x-3'>
      <CursoFilter table={table} />
      <CantidadesFilter table={table} />
      <MateriasFilter table={table} />
      {table.getColumn('promocion')?.getIsVisible() && <PromocionFilter table={table} />}
      <ColumnsVisibility table={table} />
    </div>
  )
}

export default FiltersPanel
