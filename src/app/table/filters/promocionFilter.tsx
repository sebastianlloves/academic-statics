import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Student } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useState } from 'react'

interface PromocionFilterProps {
  table: Table<Student>
}

function PromocionFilter ({ table } : PromocionFilterProps) {
  const [value, setValue] = useState('')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>
          Promoción<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='p-3'>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => {
            setValue(value)
            table.getColumn('promocion')?.setFilterValue(value)
          }}
          className='flex flex-col'
        >
          <DropdownMenuRadioItem
            value=''
            onSelect={(e) => e.preventDefault()}
            className='cursor-pointer'
          >
            Todos
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value='permanece'
            onSelect={(e) => e.preventDefault()}
            className='cursor-pointer'
          >
            Sólo estudiantes que permanecen
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value='promociona'
            onSelect={(e) => e.preventDefault()}
            className='cursor-pointer'
          >
            Sólo estudiantes que promocionan
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PromocionFilter
