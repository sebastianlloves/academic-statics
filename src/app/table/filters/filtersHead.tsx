import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { type Student } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useState } from 'react'

interface FiltersHeadProps<TData> {
  table: Table<TData>
}

function FiltersHead<TData> ({ table } : FiltersHeadProps<TData>) {
  /* const maxCantTroncales = table.getCoreRowModel().rows.reduce((acc, newValue) => newValue.original.materiasPendientes.cantTroncales || acc - 1 > acc ? newValue.original.materiasPendientes.cantTroncales || acc : acc, 0)
  const minCantTroncales = table.getCoreRowModel().rows.reduce((acc, newValue) => newValue.original.materiasPendientes.cantTroncales || (acc + 1) < acc ? newValue.original.materiasPendientes.cantTroncales : acc, maxCantTroncales) */
  const [cantTroncales, setCantTroncales] = useState([0, 15])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='font-normal'>Troncales<CaretSortIcon className='ml-2 h-4 w-4 opacity-50' /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center' className='p-3 flex justify-between space-x-2'>
        <span className='w-16 font-light text-sm text-center'>{cantTroncales[0]}</span>
        <Slider
          defaultValue={cantTroncales}
          onValueChange={(value) => {
            console.log(value)
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

export default FiltersHead
