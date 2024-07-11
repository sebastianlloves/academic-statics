import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CaretSortIcon } from '@radix-ui/react-icons'
import SliderItem from './sliderItem'
import { Table } from '@tanstack/react-table'
import { Student } from '@/types'

interface CantidadesFilterProps {
  table: Table<Student>
}

function CantidadesFilter ({ table } : CantidadesFilterProps) {
  // const min = table.getColumn('troncales')?.getFacetedMinMaxValues()?.[0] ?? 0
  // const max = table.getColumn('troncales')?.getFacetedMinMaxValues()?.[1] ?? 0
  // const [min, max] = table.getColumn('troncales')?.getFacetedMinMaxValues() ?? [0, 1]
  const uniqueValuesTroncales = table.getColumn('troncales')?.getFacetedUniqueValues()
  const uniqueValuesGenerales = table.getColumn('generales')?.getFacetedUniqueValues()

  console.log(uniqueValuesTroncales)
  console.log(uniqueValuesGenerales)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>
          Cantidades<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='p-1'>
        {/* {table.getColumn('troncales')?.getIsVisible() && (
          <SliderItem
            minMaxCant={[min, max]}
            column={table.getColumn('troncales')}
          />
        )}
        {table.getColumn('generales')?.getIsVisible() && (
          <SliderItem
            minMaxCant={minMaxGenerales}
            column={table.getColumn('generales')}
          />
        )}
        {table.getColumn('enProceso2020')?.getIsVisible() &&
          <SliderItem
            minMaxCant={minMaxEnProceso2020}
            column={table.getColumn('enProceso2020')}
          />} */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CantidadesFilter
