import { Student } from '@/types'
import { ColumnFilter, Table } from '@tanstack/react-table'
import FilterBox from './filterBox'

interface CantidadesFilterBoxProps {
  filters: ColumnFilter[],
  table: Table<Student>
}

function CantidadesFilterBox ({ filters, table }: CantidadesFilterBoxProps) {
  const filterValues = filters.map(filter => {
    const minMax = (filter.value as (number[] & {length: 2}))
    const subjectType = table.getColumn(filter.id)?.columnDef.meta?.title
    const value = minMax[0] === minMax[1] ? `${minMax[0]} materias ${subjectType}` : `Entre ${minMax[0]} y ${minMax[1]} materias ${subjectType}`
    return { id: filter.id, value }
  })

  return (
    <FilterBox
      title='Cantidades'
      filterValues={filterValues}
      handleBoxClick={() => filterValues?.forEach(filter => table.getColumn(filter.id)?.setFilterValue(undefined))}
      handleItemClick={(filter) => () => table.getColumn(filter.id)?.setFilterValue(undefined)}
    />
  )
}

export default CantidadesFilterBox

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
