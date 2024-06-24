import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { Student } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

interface TroncalesFilterProps {
  table: Table<Student>
}

interface filterValueState {
  troncalesRange: number[],
  generalesRange: number[],
  enCondicionPermanencia: boolean,
  enCondicionPromocion: boolean
}
/*
- unificar estados de cantTroncales y cantGenerales al estado filterValue
- que los dos memos actualicen este estado filterValue
- que los onChekedChange y onValueChange de los inputs establezcan el filtro en la columna que corresponda con este nuevo estado filterValue
- en la definición de columnas, definir una sóla vez la función pendientesFilterFn y pasársela como filterFn a las columnas de troncales y generales
*/

function TroncalesFilter ({ table } : TroncalesFilterProps) {
  const data = table.getCoreRowModel().rows
  const [filterValue, setFilterValue] = useState<filterValueState>({
    troncalesRange: [0, 0],
    generalesRange: [0, 0],
    enCondicionPermanencia: true,
    enCondicionPromocion: true
  })
  console.log(filterValue)
  const [cantTroncales, setCantTroncales] = useState([0, 0])
  const [cantGenerales, setCantGenerales] = useState([0, 0])
  const maxCantTroncales = useMemo(() => {
    const value = data.length > 0
      ? data.reduce((prevValue, newValue) => {
        const newCantTotal = newValue?.original?.materiasPendientes?.cantTroncales
        return newCantTotal && newCantTotal > prevValue ? newCantTotal : prevValue
      }, 0)
      : 0
    setCantTroncales([0, value])
    return value
  }, [data])

  const maxCantGenerales = useMemo(() => {
    const value = data.length > 0
      ? data.reduce((prevValue, newValue) => {
        const newCantTotal = newValue?.original?.materiasPendientes?.cantGenerales
        return newCantTotal && newCantTotal > prevValue ? newCantTotal : prevValue
      }, 0)
      : 0
    setCantGenerales([0, value])
    return value
  }, [data])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>Pendientes<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='p-3'>
        <div className='flex flex-col space-y-4 px-4 py-3'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              checked={filterValue.enCondicionPermanencia}
              onCheckedChange={(checked) => {
                setFilterValue((prevState) => { return { ...prevState, enCondicionPermanencia: !prevState.enCondicionPermanencia } })
                table.getColumn('generales')?.setFilterValue(checked ? 'repite' : [0, 7])
              }}
              id='permanencia'
            />
            <label htmlFor='permanencia' className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              En condición de Permanencia
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              checked={filterValue.enCondicionPromocion}
              id='promocion'
            />
            <label htmlFor='promocion' className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              En condición de Promoción
            </label>
          </div>
        </div>
        <DropdownMenuSeparator className='my-3' />
        <h4 className='text-center text-accent-foreground font-medium tracking-tight'>Troncales</h4>
        <div className='p-2 flex justify-between space-x-2'>
          <span className='w-8 font-light text-sm text-center'>{cantTroncales[0]}</span>
          <Slider
            defaultValue={cantTroncales}
            onValueChange={(value) => {
              setCantTroncales(value)
              table.getColumn('troncales')?.setFilterValue(value)
            }}
            max={maxCantTroncales}
            step={1}
            className='w-80'
            color='bg-primary'
          />
          <span className='w-8 font-light text-sm text-center'>{cantTroncales[1]}</span>
        </div>
        <DropdownMenuSeparator className='my-3' />
        <h4 className='text-center text-foreground'>Generales</h4>
        <div className='p-2 flex justify-between space-x-2'>
          <span className='w-8 font-light text-sm text-center'>{cantGenerales[0]}</span>
          <Slider
            defaultValue={cantGenerales}
            onValueChange={(value) => {
              setCantGenerales(value)
              table.getColumn('generales')?.setFilterValue(value)
            }}
            max={maxCantGenerales}
            step={1}
            className='w-80'
            color='bg-primary'
          />
          <span className='w-8 font-light text-sm text-center'>{cantGenerales[1]}</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TroncalesFilter
