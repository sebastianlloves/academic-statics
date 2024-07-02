import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ANIO, Student } from '@/types'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import SliderItem from './sliderItem'
import { MATERIAS_POR_CURSO } from '@/constants'

interface MateriasFilterProps {
  table: Table<Student>
}

export interface materiasFilterValueState {
  troncalesRange: [number, number],
  generalesRange: [number, number],
  enProceso2020Range: [number, number],
  promotedAndRepetears: 'all' | 'onlyRepeaters' | 'onlyPromoted',
  subjects: 'all' | string[] | false
}

function MateriasFilter ({ table } : MateriasFilterProps) {
  const data = table.getCoreRowModel().rows
  const [materiasFilterValue, setMateriasFilterValue] = useState<materiasFilterValueState>({
    troncalesRange: [0, 0],
    generalesRange: [0, 0],
    enProceso2020Range: [0, 0],
    promotedAndRepetears: 'all',
    subjects: /* 'all' */ ['Inglés (1°)']
  })
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
    setMateriasFilterValue((prevState) => {
      return { ...prevState, troncalesRange: [0, maxCantTroncales], generalesRange: [0, maxCantGenerales], enProceso2020Range: [0, maxCantEnProceso2020] }
    })
    return [maxCantTroncales, maxCantGenerales, maxCantEnProceso2020]
  }, [data])

  const subjects = useMemo(() => {
    const a = Object.keys(MATERIAS_POR_CURSO).map(anio => {
      const subjectsByAnio = MATERIAS_POR_CURSO[Number(anio) as ANIO].map(objSubject => `${objSubject.nombre} (${anio}°)`)
      return [`${anio}° año`, subjectsByAnio]
    })
    console.log(a)
  }, [])
  console.log(materiasFilterValue.subjects)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='w-fit'>
        <Button variant='outline' className='font-normal'>Materias<CaretSortIcon className='ml-3 h-4 w-4 opacity-50' /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='p-3'>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger inset>Materias</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={14}>
              <DropdownMenuCheckboxItem
                onSelect={e => e.preventDefault()}
                className='cursor-pointer font-semibold text-foreground pr-3'
                checked={materiasFilterValue.subjects === 'all'}
                onClick={() => {
                  materiasFilterValue.subjects === 'all' ? setMateriasFilterValue((prevState) => { return { ...prevState, subjects: false } }) : setMateriasFilterValue((prevState) => { return { ...prevState, subjects: 'all' } })
                }}
              >
                Todas las materias
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              {
                Object.keys(MATERIAS_POR_CURSO).map(anio => (
                  <DropdownMenuSub key={anio}>
                    <DropdownMenuSubTrigger inset>
                      {`${anio}° año`}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent sideOffset={6}>
                        <DropdownMenuCheckboxItem
                          onSelect={e => e.preventDefault()}
                          className='cursor-pointer font-medium text-foreground pr-3'
                          checked={materiasFilterValue.subjects === 'all'}
                        >
                          {`Todas las materias de ${anio}° año`}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        {
                        MATERIAS_POR_CURSO[(Number(anio) as keyof(typeof MATERIAS_POR_CURSO))].map(({ nombre }) => (
                          <DropdownMenuCheckboxItem
                            onSelect={e => e.preventDefault()}
                            key={`${nombre}_${anio}`}
                            className='cursor-pointer'
                            checked={materiasFilterValue.subjects === 'all' || (materiasFilterValue.subjects && materiasFilterValue.subjects.includes(`${nombre} (${anio}°)`))}
                          >
                            {nombre}
                          </DropdownMenuCheckboxItem>
                        ))
                        }
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ))
              }
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator className='my-3' />

        <DropdownMenuGroup>
          <SliderItem
            rangeValues={materiasFilterValue.troncalesRange}
            maxCant={maxCantTroncales}
            handleValueChange={(value: [number, number]) => {
              const newState = { ...materiasFilterValue, troncalesRange: value }
              setMateriasFilterValue(newState)
              table.getColumn('troncales')?.setFilterValue(newState)
              table.getColumn('generales')?.setFilterValue(newState)
            }}
            materiaType='troncales'
          />
          <SliderItem
            rangeValues={materiasFilterValue.generalesRange}
            maxCant={maxCantGenerales}
            handleValueChange={(value: [number, number]) => {
              const newState = { ...materiasFilterValue, generalesRange: value }
              setMateriasFilterValue(newState)
              table.getColumn('troncales')?.setFilterValue(newState)
              table.getColumn('generales')?.setFilterValue(newState)
            }}
            materiaType='generales'
          />
          <SliderItem
            rangeValues={materiasFilterValue.enProceso2020Range}
            maxCant={maxCantEnProceso2020}
            handleValueChange={(value: [number, number]) => {
              const newState = { ...materiasFilterValue, enProceso2020Range: value }
              setMateriasFilterValue(newState)
              table.getColumn('enProceso2020')?.setFilterValue(newState)
            }}
            materiaType='en proceso 2020'
          />
        </DropdownMenuGroup>

        <DropdownMenuSeparator className='my-3' />

        <DropdownMenuGroup className='flex flex-col space-y-2'>
          <DropdownMenuLabel asChild>
            <h4 className='text-center text-accent-foreground font-medium tracking-tight'>Promoción y permanencia</h4>
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            onValueChange={(value) => {
              const newState = { ...materiasFilterValue, promotedAndRepetears: (value as materiasFilterValueState['promotedAndRepetears']) }
              setMateriasFilterValue(newState)
              table.getColumn('troncales')?.setFilterValue(newState)
              table.getColumn('generales')?.setFilterValue(newState)
            }}
            className='flex flex-col'
            value={materiasFilterValue.promotedAndRepetears}
          >
            <DropdownMenuRadioItem
              value='all'
              onSelect={(e) => e.preventDefault()}
              className='cursor-pointer'
            >
              Todos
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value='onlyRepeaters'
              onSelect={(e) => e.preventDefault()}
              className='cursor-pointer'
            >
              Sólo estudiantes que repiten
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value='onlyPromoted'
              onSelect={(e) => e.preventDefault()}
              className='cursor-pointer'
            >
              Sólo estudiantes que promocionan
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MateriasFilter

export interface a {
  quantity: {
    troncalesRange: [number, number],
    generalesRange: [number, number],
    enProceso2020Range: [number, number],
    promotedAndRepetears: 'all' | 'onlyRepeaters' | 'onlyPromoted'
    subjects: 'all' | string[]
    },
  subjects: []
}
