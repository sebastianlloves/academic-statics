import { Input } from '@/components/ui/input'
import { Student } from '@/types'
import { Table } from '@tanstack/react-table'

interface SearchBarProps {
  table: Table<Student>
}

function SearchBar ({ table } : SearchBarProps) {
  const filterValue = (table.getColumn('estudiante')?.getFilterValue() || table.getColumn('dni')?.getFilterValue() || '') as string | number

  return (
    <Input
      className='w-72 rounded-lg bg-background shadow-sm'
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
  )
}

export default SearchBar
