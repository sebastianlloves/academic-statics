import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Slider } from '@/components/ui/slider'
import { Student } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

interface TroncalesFilterProps {
  table: Table<Student>
}

function TroncalesFilter ({ table } : TroncalesFilterProps) {
  const [cantTroncales, setCantTroncales] = useState([0, 0])
  const maxCantTroncales = useMemo(() => {
    const value = table.getCoreRowModel().rows.reduce((prevValue, newValue) => {
      const newCantTotal = newValue.original.materiasPendientes.cantTroncales ?? 0
      return newCantTotal > prevValue ? newCantTotal : prevValue
    }, 0)
    setCantTroncales([0, value])
    return value
  }, [table])

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
          max={maxCantTroncales}
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
