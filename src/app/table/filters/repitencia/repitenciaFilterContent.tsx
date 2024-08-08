import { DropdownMenuCheckboxItem, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { CURSOS } from '@/constants'
import Item from '../filterInputs/item'
import { RepitenciaFilterProps } from './repitenciaFilter'
import { ColumnFilter } from '@tanstack/react-table'
import { useMemo } from 'react'
import { Slider } from '@/components/ui/slider'

export interface RepitenciaFilterContentProps extends RepitenciaFilterProps {
  facets?: Map<number, number>,
  repitenciaFilter?: ColumnFilter
}

export interface RepitenciaFilterState {
  quantity?: number[] & {length:2},
  repAnios?: number[]
}

function RepitenciaFilterContent ({ table, facets, repitenciaFilter } : RepitenciaFilterContentProps) {
  const filterValue = repitenciaFilter?.value as (RepitenciaFilterState | undefined)
  const data = table.getCoreRowModel().rows
  const maxCantRepeticiones = useMemo(() => data.reduce((acc, newValue) => (newValue.original.repitencia?.length || 0) > acc ? (newValue.original.repitencia?.length || 0) : acc, 0), [data])
  const range = filterValue?.quantity || [0, maxCantRepeticiones]
  console.log(filterValue)

  return (
    <>
      {Object.keys(CURSOS).slice(0, -1).map(Number).map(anio => {
        const quantity = facets?.get(anio) || 0
        return (
          <DropdownMenuCheckboxItem
            key={anio}
            onSelect={e => e.preventDefault()}
            className='cursor-pointer'
            checked={filterValue?.repAnios?.includes(anio)}
            onCheckedChange={() => {
              if (!repitenciaFilter) table.getColumn('repitencia')?.setFilterValue({ repAnios: [anio] })
              else {
                const prevRepAniosState = filterValue?.repAnios || []
                const newRepAniosState = prevRepAniosState?.includes(anio) ? prevRepAniosState.filter(prevAnio => prevAnio !== anio) : [...prevRepAniosState, anio]
                const newFilterValue = filterValue?.quantity === undefined && newRepAniosState.length === 0
                  ? undefined
                  : {
                      ...filterValue,
                      repAnios: newRepAniosState.length === 0
                        ? undefined
                        : newRepAniosState
                    }
                table.getColumn('repitencia')?.setFilterValue(newFilterValue)
              }
            }}
          >
            <Item value={`${anio}° año`} quantity={quantity} />
          </DropdownMenuCheckboxItem>
        )
      })}
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
        <div className='grid py-2 space-y-2'>
          <h4 className='text-sm text-center text-accent-foreground font-normal tracking-tight py-0'>Cantidad de repitencias</h4>
          <div className='flex justify-center gap-x-2'>
            <span className='w-4 font-light text-sm text-center'>{range[0]}</span>
            <Slider
              value={range}
              onValueChange={(value) => {
                if (!filterValue) table.getColumn('repitencia')?.setFilterValue({ quantity: value })
                else {
                  const newQuantityState = value[0] === 0 && value[1] === maxCantRepeticiones ? undefined : value
                  const newFilterValue = filterValue?.repAnios === undefined ? undefined : { ...filterValue, quantity: newQuantityState }
                  table.getColumn('repitencia')?.setFilterValue(newFilterValue)
                }
              }}
              max={maxCantRepeticiones}
              step={1}
              className='w-28'
              color='bg-primary'
            />

            <span className='w-4 font-light text-sm text-center'>{range[1]}</span>
          </div>
        </div>
      </DropdownMenuItem>
    </>
  )
}

export default RepitenciaFilterContent
