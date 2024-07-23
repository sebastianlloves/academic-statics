import { CURSOS } from '@/constants'
import { CURSO, Student } from '@/types'
import { Column, ColumnFilter } from '@tanstack/react-table'
import { useMemo } from 'react'
import FilterBox from './filterBox'

interface CursoFilterBoxProps {
  filter: ColumnFilter,
  column?: Column<Student>
}

function CursoFilterBox ({ filter, column }: CursoFilterBoxProps) {
  const coursesByYear = useMemo(() =>
    Object.fromEntries(Object.keys(CURSOS)
      .map(anio => [`${anio}° año`, CURSOS[Number(anio) as keyof(typeof CURSOS)]
        .map(({ nombre }) => nombre)]))
  , [])
  const filterValues = (filter.value as string[])
    .reduce((acc, newValue) => {
      const anio = newValue.split(' ')[0]
      if (coursesByYear[`${anio} año`].every(curso => acc.includes(curso))) {
        return [...acc.filter(value => !coursesByYear[`${anio} año`].includes(value as CURSO)), `${anio} año`]
      }
      return acc
    }, (filter.value as string[]))
  console.log(coursesByYear)

  return (
    <FilterBox
      title='Cursos'
      filterValues={filterValues}
      handleBoxClick={() => column?.setFilterValue(undefined)}
      handleItemClick={(item) => () => column?.setFilterValue((prevState: string[]) => {
        const newState = coursesByYear[item]
          ? prevState.filter(prevValue => !coursesByYear[item].includes(prevValue as CURSO))
          : prevState.filter(prevValue => prevValue !== item)
        return newState.length ? newState : undefined
      })}
    />
  )
}

export default CursoFilterBox

/*
<div className='border py-1 px-1 rounded-md grid space-y-1'>
      <div className='flex justify-between items-center'>
        <h4 className='font-medium text-muted-foreground text-xs uppercase'>{column?.columnDef.meta?.title}</h4>
        <X
          size={15} strokeWidth='1.5px' className='text-muted-foreground cursor-pointer'
          onClick={() => column?.setFilterValue(undefined)}
        />
      </div>
      <div className='flex justify-start gap-2 p-1 flex-wrap'>
        {
        (filterValues).map((item: string) => (
          <Badge key={item} variant='secondary' className='font-normal pl-2 pr-1 leading-tight'>
            <div className='flex justify-start items-center gap-x-3'>
              <p className=''>{item}</p>
              <X
                size={13} strokeWidth='1.5px' className='text-muted-foreground cursor-pointer'
                onClick={() => column?.setFilterValue((prevState: string[]) => prevState.filter(prevValue => prevValue !== item))}
              />
            </div>
          </Badge>
        ))
      }
      </div>
    </div>
*/
