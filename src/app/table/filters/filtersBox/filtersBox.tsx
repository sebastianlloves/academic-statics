import { Student } from '@/types'
import { Table } from '@tanstack/react-table'
import CursoFilterBox from './cursoFilterBox'
import MateriasFilterBox from './materiasFilterBox'
import { Button } from '@/components/ui/button'
import PromocionFilterBox from './promocionFilterBox'
import CantidadesFilterBox from './cantidadesFilterBox'

interface FiltersBoxProps {
  table: Table<Student>
}

function FiltersBox ({ table } : FiltersBoxProps) {
  const filtersValues = table.getState().columnFilters
  const cursoFilterValue = filtersValues.find(filtro => filtro.id === 'curso')
  const materiasFilterValue = filtersValues.find(filtro => filtro.id === 'expand')
  const promocionFilterValue = filtersValues.find(filtro => filtro.id === 'promocion')
  const cantidadesFilterValues = [
    filtersValues.find(filtro => filtro.id === 'troncales'),
    filtersValues.find(filtro => filtro.id === 'generales'),
    filtersValues.find(filtro => filtro.id === 'enProceso2020')
  ].filter(value => value !== undefined)
  console.log(filtersValues)
  return filtersValues.length > 0 && (
    <div className='w-full p-3 grid space-y-2'>
      {/* <h4 className='scroll-m-20 text-sm text-muted-foreground font-semibold tracking-tight capitalize'>Filtros Activos</h4> */}
      <div className='flex'>
        {cursoFilterValue && <CursoFilterBox filter={cursoFilterValue} table={table} />}
        {cantidadesFilterValues.length > 0 && <CantidadesFilterBox filters={cantidadesFilterValues} table={table} />}
        {materiasFilterValue && <MateriasFilterBox filter={materiasFilterValue} table={table} />}
        {promocionFilterValue && <PromocionFilterBox filter={promocionFilterValue} table={table} />}
        <Button
          variant='secondary'
          className='flex items-center gap-x-3 border border-border shadow-sm w-fit justify-self-end'
          onClick={() => table.resetColumnFilters()}
        >Limpiar filtros
        </Button>
      </div>
    </div>
  )
}

export default FiltersBox
