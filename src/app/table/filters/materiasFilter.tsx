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
import SliderItem from './sliderItem'

interface PendientesFilterProps {
  table: Table<Student>
}

export interface pendientesFilterValueState {
  troncalesRange: [number, number],
  generalesRange: [number, number],
  promotedAndRepetears: 'all' | 'onlyRepeaters' | 'onlyPromoted'
}

function MateriasFilter ({ table } : PendientesFilterProps) {
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

        <DropdownMenuGroup>
          <SliderItem
            rangeValues={pendientesFilterValue.troncalesRange}
            maxCant={maxCantTroncales}
            handleValueChange={(value: [number, number]) => {
              const newState = { ...pendientesFilterValue, troncalesRange: value }
              setPendientesFilterValue(newState)
              table.getColumn('troncales')?.setFilterValue(newState)
              table.getColumn('generales')?.setFilterValue(newState)
            }}
            materiaType='troncales'
          />

          <DropdownMenuSeparator />

          <SliderItem
            rangeValues={pendientesFilterValue.generalesRange}
            maxCant={maxCantGenerales}
            handleValueChange={(value: [number, number]) => {
              const newState = { ...pendientesFilterValue, generalesRange: value }
              setPendientesFilterValue(newState)
              table.getColumn('troncales')?.setFilterValue(newState)
              table.getColumn('generales')?.setFilterValue(newState)
            }}
            materiaType='generales'
          />
          <DropdownMenuSeparator />

          <SliderItem
            rangeValues={pendientesFilterValue.generalesRange}
            maxCant={9}
            handleValueChange={(value: [number, number]) => {
              const newState = pendientesFilterValue.generalesRange
              // setPendientesFilterValue(newState)
              table.getColumn('enProceso2020')?.setFilterValue(newState)
            }}
            materiaType='en proceso 2020'
          />
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

export default MateriasFilter

/* (value) => {
                        const newState = { ...pendientesFilterValue, troncalesRange: value }
                        setPendientesFilterValue(newState)
                        table.getColumn('troncales')?.setFilterValue(newState)
                        table.getColumn('generales')?.setFilterValue(newState)
                      } */
