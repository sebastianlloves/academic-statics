import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Student } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

interface PendientesFilterProps {
  table: Table<Student>
}

export interface pendientesFilterValueState {
  troncalesRange: number[],
  generalesRange: number[],
  promotedAndRepetears: 'all' | 'onlyRepeaters' | 'onlyPromoted'
}

function PendientesFilter ({ table } : PendientesFilterProps) {
  const data = table.getCoreRowModel().rows
  const [pendientesFilterValue, setPendientesFilterValue] = useState<pendientesFilterValueState>({
    troncalesRange: [0, 0],
    generalesRange: [0, 0],
    promotedAndRepetears: 'all'
  })
  const maxCantTroncales = useMemo(() => {
    const value = data.length > 0
      ? data.reduce((prevValue, newValue) => {
        const newCantTotal = newValue?.original?.materiasPendientes?.cantTroncales
        return newCantTotal && newCantTotal > prevValue ? newCantTotal : prevValue
      }, 0)
      : 0
    setPendientesFilterValue((prevState) => {
      return { ...prevState, troncalesRange: [0, value] }
    })
    return value
  }, [data])
  const maxCantGenerales = useMemo(() => {
    const value = data.length > 0
      ? data.reduce((prevValue, newValue) => {
        const newCantTotal = newValue?.original?.materiasPendientes?.cantGenerales
        return newCantTotal && newCantTotal > prevValue ? newCantTotal : prevValue
      }, 0)
      : 0
    setPendientesFilterValue((prevState) => {
      return { ...prevState, generalesRange: [0, value] }
    })
    return value
  }, [data])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>Pendientes<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='px-3'>
        <DropdownMenuLabel className='text-center text-accent-foreground font-medium tracking-tight'>
          Troncales
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
            <div className='flex justify-between space-x-2 py-1'>
              <span className='w-8 font-light text-sm text-center'>{pendientesFilterValue.troncalesRange[0]}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Slider
                      defaultValue={pendientesFilterValue.troncalesRange}
                      onValueChange={(value) => {
                        const newState = { ...pendientesFilterValue, troncalesRange: value }
                        setPendientesFilterValue(newState)
                        table.getColumn('troncales')?.setFilterValue(newState)
                        table.getColumn('generales')?.setFilterValue(newState)
                      }}
                      max={maxCantTroncales}
                      step={1}
                      className='w-80'
                      color='bg-primary'
                    />
                  </TooltipTrigger>
                  <TooltipContent side='bottom' className='bg-background border rounded-md w-fit p-3'>
                    <p className='text-sm text-center text-muted-foreground'>{pendientesFilterValue.troncalesRange[0] === pendientesFilterValue.troncalesRange[1]
                      ? `Estudiantes que tengan ${pendientesFilterValue.troncalesRange[1]} materias troncales`
                      : `Estudiantes que tengan entre ${pendientesFilterValue.troncalesRange[0]} y ${pendientesFilterValue.troncalesRange[1]} materias troncales`}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className='w-8 font-light text-sm text-center'>{pendientesFilterValue.troncalesRange[1]}</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className='text-center text-accent-foreground font-medium tracking-tight'>
            Generales
          </DropdownMenuLabel>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className='p-2 flex justify-between space-x-2 my-2'>
                  <span className='w-8 font-light text-sm text-center'>{pendientesFilterValue.generalesRange[0]}</span>
                  <Slider
                    defaultValue={pendientesFilterValue.generalesRange}
                    onValueChange={(value) => {
                      const newState = { ...pendientesFilterValue, generalesRange: value }
                      setPendientesFilterValue(newState)
                      table.getColumn('troncales')?.setFilterValue(newState)
                      table.getColumn('generales')?.setFilterValue(newState)
                    }}
                    max={maxCantGenerales}
                    step={1}
                    className='w-80'
                    color='bg-primary'
                  />
                  <span className='w-8 font-light text-sm text-center'>{pendientesFilterValue.generalesRange[1]}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side='bottom' className='bg-background border rounded-md w-fit p-3'>
                <p className='text-sm text-center text-muted-foreground'>{pendientesFilterValue.generalesRange[0] === pendientesFilterValue.generalesRange[1]
                  ? `Estudiantes que tengan ${pendientesFilterValue.generalesRange[1]} materias generales`
                  : `Estudiantes que tengan entre ${pendientesFilterValue.generalesRange[0]} y ${pendientesFilterValue.generalesRange[1]} materias generales`}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='my-3' />
        <div className='flex flex-col space-y-3 px-4 pb-3'>
          <DropdownMenuLabel asChild>
            <h4 className='text-center text-accent-foreground font-medium tracking-tight'>Promoción y permanencia</h4>
          </DropdownMenuLabel>
          <RadioGroup
            onValueChange={(value: pendientesFilterValueState['promotedAndRepetears']) => {
              const newState = { ...pendientesFilterValue, promotedAndRepetears: value }
              setPendientesFilterValue(newState)
              table.getColumn('troncales')?.setFilterValue(newState)
              table.getColumn('generales')?.setFilterValue(newState)
            }}
            className='flex flex-col space-y-2'
            defaultValue={pendientesFilterValue.promotedAndRepetears}
          >
            <div className='flex items-center space-x-3'>
              <RadioGroupItem value='all' id='all' />
              <Label className='text-sm font-normal leading-none cursor-pointer' htmlFor='all'>Todos</Label>
            </div>
            <div className='flex items-center space-x-3'>
              <RadioGroupItem value='onlyRepeaters' id='onlyRepeaters' />
              <Label className='text-sm font-normal leading-none cursor-pointer' htmlFor='onlyRepeaters'>Sólo estudiantes que repiten</Label>
            </div>
            <div className='flex items-center space-x-3'>
              <RadioGroupItem value='onlyPromoted' id='onlyPromoted' />
              <Label className='text-sm font-normal leading-none cursor-pointer' htmlFor='onlyPromoted'>Sólo estudiantes que promocionan</Label>
            </div>
          </RadioGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PendientesFilter
