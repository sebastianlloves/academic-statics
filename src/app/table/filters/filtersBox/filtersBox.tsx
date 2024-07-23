import { Student } from '@/types'
import { Table } from '@tanstack/react-table'
import CursoFilterBox from './cursoFilterBox'
import MateriasFilterBox from './materiasFilterBox'
import { Button } from '@/components/ui/button'
import PromocionFilterBox from './promocionFilterBox'

interface FiltersBoxProps {
  table: Table<Student>
}

function FiltersBox ({ table } : FiltersBoxProps) {
  const filtersValues = table.getState().columnFilters
  const cursoFilterValue = filtersValues.find(filtro => filtro.id === 'curso')
  const materiasFilterValue = filtersValues.find(filtro => filtro.id === 'expand')
  const promocionFilterValue = filtersValues.find(filtro => filtro.id === 'promocion')
  console.log(filtersValues)
  return filtersValues.length > 0 && (
    <div className='border rounded-lg bg-background w-full p-3 grid space-y-3'>
      <h3>Filtros aplicados</h3>
      {cursoFilterValue && <CursoFilterBox key={cursoFilterValue.id} filter={cursoFilterValue} column={table.getColumn(cursoFilterValue.id)} />}
      {materiasFilterValue && <MateriasFilterBox key={materiasFilterValue.id} filter={materiasFilterValue} column={table.getColumn(materiasFilterValue.id)} />}
      {promocionFilterValue && <PromocionFilterBox key={promocionFilterValue.id} filter={promocionFilterValue} column={table.getColumn(promocionFilterValue.id)} />}
      <Button
        variant='secondary'
        className='flex items-center gap-x-3 w-fit justify-self-end'
        onClick={() => table.resetColumnFilters()}
      >Limpiar filtros
      </Button>
    </div>
  )
}

export default FiltersBox
