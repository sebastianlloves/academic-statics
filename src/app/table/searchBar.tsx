import { Input } from '@/components/ui/input'
import { Student } from '@/types'
import { Table } from '@tanstack/react-table'

interface SearchBarProps {
  table: Table<Student>
}

function SearchBar ({ table } : SearchBarProps) {
  const filterValue = (table.getColumn('estudiante')?.getFilterValue() || table.getColumn('dni')?.getFilterValue()) as string | number | undefined
  console.log(filterValue)

  return (
    <div className='w-72 px-2 flex border items-center ml-48'>
      <Input
        className='w-72'
        placeholder='Buscar estudiantes por nombre o DNI'
        value={filterValue}
        onChange={(e) => {
          if (e.target.value === '') {
            table.getColumn('estudiante')?.setFilterValue(undefined)
            table.getColumn('dni')?.setFilterValue(undefined)
          }
          if (Number.isNaN(parseInt(e.target.value))) table.getColumn('estudiante')?.setFilterValue(e.target.value)
          else table.getColumn('dni')?.setFilterValue(e.target.value)
        }}
      />
    </div>
  )
}

export default SearchBar
