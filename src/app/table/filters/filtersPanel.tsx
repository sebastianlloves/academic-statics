import { Student } from '@/types'
import { Table } from '@tanstack/react-table'
import CursoFilter from './cursosFilter'
import MateriasFilter from './cantidadesFilter/materiasFilter/materiasFilter'
import CantidadesFilter from './cantidadesFilter/cantidadesFilter'
import PromocionFilter from './promocionFilter/promocionFilter'

interface FiltersPanelProps {
  table: Table<Student>
}

function FiltersPanel ({ table } : FiltersPanelProps) {
  return (
    <div className='flex items-center gap-x-3'>
      <CursoFilter table={table} />
      <MateriasFilter table={table} />
      <CantidadesFilter table={table} />
      <PromocionFilter table={table} />
    </div>
  )
}

export default FiltersPanel
