import { CURSO, Student } from '@/types'
import { ColumnFilter, Table } from '@tanstack/react-table'
import CursoFilter from './cursosFilter'
import MateriasFilter, { MateriasFilterState } from './materiasFilter'
import CantidadesFilter from './cantidadesFilter'
import PromocionFilter from './promocionFilter'
import ColumnsVisibility from './columnsVisibility'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface FiltersPanelProps {
  table: Table<Student>
}

type filterValueType = MateriasFilterState | CURSO[]

const filtersByColumn: {[key:string]: (filter : ColumnFilter) => Array<string>} = {
  expand: (filter) => {
    const { subjects, strictInclusion } = filter.value as MateriasFilterState
    return strictInclusion ? [...subjects, 'Inclusión estricta'] : [...subjects]
  }
}

function FiltersPanel ({ table } : FiltersPanelProps) {
  const isTroncalesVisible = table.getColumn('troncales')?.getIsVisible()
  const isGeneralesVisible = table.getColumn('generales')?.getIsVisible()
  const isEnProceso2020Visible = table.getColumn('enProceso2020')?.getIsVisible()
  const filtersValues = table.getState().columnFilters/* ?.flatMap(({ id, value }) => filtersByColumn[id]({ id, value })) */
  console.log(filtersValues)

  return (
    <div className='flex flex-col justify-start items-start gap-y-4 w-64'>
      <ColumnsVisibility className='ml-auto' table={table} />
      <CursoFilter table={table} />
      {(isTroncalesVisible || isGeneralesVisible || isEnProceso2020Visible) && (
        <>
          <CantidadesFilter table={table} />
          <MateriasFilter table={table} />
        </>
      )}
      {table.getColumn('promocion')?.getIsVisible() && <PromocionFilter table={table} />}
      {/* <div className='flex items-start justify-start gap-x-1 gap-y-1 flex-wrap'>{
      filtersValues?.map(filter => (
        <Badge
          key={filter}
          variant='secondary'
          className='rounded-full'
        >{filter}
        </Badge>
      ))
      }
      </div> */}
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
