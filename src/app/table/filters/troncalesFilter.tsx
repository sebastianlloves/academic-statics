import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useState } from 'react'

interface TroncalesFilterProps<TData> {
  table: Table<TData>
}

function TroncalesFilter<TData> ({ table } : TroncalesFilterProps<TData>) {
  const [cantTroncales, setCantTroncales] = useState([0, 15])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>Troncales<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='p-3 flex justify-between space-x-2'>
        <span className='w-16 font-light text-sm text-center'>{cantTroncales[0]}</span>
        <Slider
          defaultValue={cantTroncales}
          onValueChange={(value) => {
            setCantTroncales(value)
            table.getColumn('troncales')?.setFilterValue(value)
          }}
          max={15}
          step={1}
          className='w-80'
          color='bg-primary'
        />
        <span className='w-16 font-light text-sm text-center'>{cantTroncales[1]}</span>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TroncalesFilter
