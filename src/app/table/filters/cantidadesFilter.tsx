import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CaretSortIcon } from '@radix-ui/react-icons'
import SliderItem from './sliderItem'
import { Table } from '@tanstack/react-table'
import { Student } from '@/types'
import { useMemo } from 'react'

interface CantidadesFilterProps {
  table: Table<Student>
}

function CantidadesFilter ({ table } : CantidadesFilterProps) {
  const data = table.getCoreRowModel().rows
  const [maxCantTroncales, maxCantGenerales, maxCantEnProceso2020] = useMemo(() => {
    const [maxCantTroncales, maxCantGenerales, maxCantEnProceso2020] = data.length > 0
      ? data.reduce((prevValue, newValue) => {
        const [accCantTroncales, accCantGenerales, accCantEnProceso2020] = prevValue
        const newCantTroncales = newValue?.original?.materiasPendientes?.cantTroncales ?? 0
        const newCantGenerales = newValue?.original?.materiasPendientes?.cantGenerales ?? 0
        const newCantEnProceso2020 = newValue?.original?.materiasEnProceso2020?.cantidad ?? 0
        return [
          newCantTroncales > accCantTroncales ? newCantTroncales : accCantTroncales,
          newCantGenerales > accCantGenerales ? newCantGenerales : accCantGenerales,
          newCantEnProceso2020 > accCantEnProceso2020 ? newCantEnProceso2020 : accCantEnProceso2020
        ]
      }, [0, 0, 0])
      : [0, 0, 0]
    return [maxCantTroncales, maxCantGenerales, maxCantEnProceso2020]
  }, [data])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>
          Cantidades<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='p-3'>
        <SliderItem
          maxCant={maxCantTroncales}
          title='troncales'
          column={table.getColumn('troncales')}
        />
        <SliderItem
          maxCant={maxCantGenerales}
          title='generales'
          column={table.getColumn('generales')}
        />
        {table.getColumn('enProceso2020')?.getIsVisible() &&
          <SliderItem
            maxCant={maxCantEnProceso2020}
            title='en proceso (2020)'
            column={table.getColumn('enProceso2020')}
          />}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CantidadesFilter
