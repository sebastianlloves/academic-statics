import SliderItem from './sliderItem'
import { Table } from '@tanstack/react-table'
import { Student } from '@/types'
import Filter from '../filter'

interface CantidadesFilterProps {
  table: Table<Student>
}

function CantidadesFilter ({ table } : CantidadesFilterProps) {
  return (
    <Filter title='Cantidades'>
      <>
        {table.getColumn('troncales')?.getIsVisible() && (
          <SliderItem
            column={table.getColumn('troncales')}
          />
        )}
        {table.getColumn('generales')?.getIsVisible() && (
          <SliderItem
            column={table.getColumn('generales')}
          />
        )}
        {/* {table.getColumn('enProceso2020')?.getIsVisible() &&
          <SliderItem
            column={table.getColumn('enProceso2020')}
          />} */}
      </>
    </Filter>
  )
}

export default CantidadesFilter
