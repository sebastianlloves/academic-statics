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
  subjects: 'all' | string[]
}

function MateriasFilter ({ table } : MateriasFilterProps) {
  const data = table.getCoreRowModel().rows
  const [materiasFilterValue, setMateriasFilterValue] = useState<materiasFilterValueState>({
    troncalesRange: [0, 0],
    generalesRange: [0, 0],
    enProceso2020Range: [0, 0],
    promotedAndRepetears: 'all',
    subjects: /* 'all' */ ['Ciudadanía y Trabajo (4°)']
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

  const subjects : {[key: string]: string[]} = useMemo(() => {
    // console.time('subjects Calc')
    // console.log('Empezó subjects')
    const entriesSubjectsObject = Object.keys(MATERIAS_POR_CURSO).map(anio => {
      const subjectsByAnio = MATERIAS_POR_CURSO[Number(anio) as ANIO].map(objSubject => objSubject.nombre)
      return [`${anio}° año`, subjectsByAnio]
    })
    const subjects = Object.fromEntries(entriesSubjectsObject)
    // console.timeEnd('subjects Calc')
    // console.log(subjects)
    return subjects
  }, [])

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
                className='cursor-pointer font-semibold text-foreground pr-3 focus:bg-primary/10'
                checked={materiasFilterValue.subjects === 'all'}
                onClick={() => {
                  materiasFilterValue.subjects === 'all' ? setMateriasFilterValue((prevState) => { return { ...prevState, subjects: [] } }) : setMateriasFilterValue((prevState) => { return { ...prevState, subjects: 'all' } })
                }}
              >
                Todas las materias
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              {
                Object.keys(subjects).map(anio => (
                  <DropdownMenuSub key={anio}>
                    <DropdownMenuSubTrigger className='focus:bg-primary/10 data-[state=open]:bg-primary/10' inset>
                      {anio}
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent sideOffset={6}>
                        <DropdownMenuCheckboxItem
                          onSelect={e => e.preventDefault()}
                          className='cursor-pointer font-medium text-foreground pr-3 focus:bg-primary/10'
                          checked={materiasFilterValue.subjects === 'all' || subjects[anio].every(subject => materiasFilterValue.subjects.includes(`${subject} (${anio.slice(0, 2)})`))}
                          onClick={() => {
                            // console.time('subjectsByAnio')
                            const subjectsByAnio = subjects[anio].map(subject => `${subject} (${anio.slice(0, 2)})`)
                            // console.timeEnd('subjectsByAnio')
                            setMateriasFilterValue((prevState) => {
                              const prevSubjects = prevState.subjects || []
                              if (prevSubjects === 'all') {
                                // console.time('allSubjects')
                                const allSubjects = Object.keys(subjects).flatMap((anio) => subjects[anio].map(subject => `${subject} (${anio.slice(0, 2)})`))
                                // console.timeEnd('allSubjects')
                                const newSubjectsState = allSubjects.filter(subject => !subjectsByAnio.includes(subject))
                                return { ...prevState, subjects: newSubjectsState }
                              }
                              if (subjectsByAnio.every(subject => prevSubjects.includes(subject))) {
                                const newSubjectsState = prevSubjects.filter(subject => !subjectsByAnio.includes(subject))
                                return { ...prevState, subjects: newSubjectsState }
                              }
                              const newSubjectsState = new Set([...prevSubjects, ...subjectsByAnio])
                              return { ...prevState, subjects: [...newSubjectsState] }
                            })
                          }}
                        >
                          {`Todas las materias de ${anio}`}
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        {
                        subjects[anio].map((subject:string) => (
                          <DropdownMenuCheckboxItem
                            onSelect={e => e.preventDefault()}
                            key={`${subject}_${anio}`}
                            className='cursor-pointer focus:bg-primary/10'
                            checked={materiasFilterValue.subjects === 'all' || materiasFilterValue.subjects.includes(`${subject} (${anio.slice(0, 2)})`)}
                            onClick={() => {
                              if (materiasFilterValue.subjects === 'all') {
                                const allSubjects = Object.keys(subjects).flatMap((anio) => subjects[anio].map(subject => `${subject} (${anio.slice(0, 2)})`))
                                const newSubjectsState = allSubjects.filter(subject => subject !== `${subject} (${anio.slice(0, 2)})`)
                                setMateriasFilterValue(prevState => { return { ...prevState, subjects: newSubjectsState } })
                              }
                            }}
                          >
                            {subject}
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
            maxCant={maxCantTroncales}
            materiaType='troncales'
            column={table.getColumn('troncales')}
          />
          <SliderItem
            maxCant={maxCantGenerales}
            materiaType='generales'
            column={table.getColumn('generales')}
          />
          <SliderItem
            maxCant={maxCantEnProceso2020}
            materiaType='en proceso (2020)'
            column={table.getColumn('enProceso2020')}
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
