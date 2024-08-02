import { getCoreRowModel, useReactTable, getFilteredRowModel, getSortedRowModel, getExpandedRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, Column } from '@tanstack/react-table'
import { columns } from './columns'
import { Student } from '@/types'
import { useMemo, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import FiltersPanel from './filters/filtersPanel'
import SearchBar from './searchBar'
import ColumnsVisibility from './filters/filterInputs/columnsVisibility'
import { URL_TRAYECTORIA_2023, URL_TRAYECTORIA_2024 } from '@/constants'
import useStudentsData from '@/hooks/useStudentsData'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StudentsTable } from './studentsTable'

export function DataTable () {
  const [url, setUrl] = useState(URL_TRAYECTORIA_2024)
  const { data, loading, setLoading } = useStudentsData(url)

  const columnsTable = useMemo(() => loading || (data === false)
    ? columns.map(column => {
      return {
        ...column,
        cell: ({ column } : {column: Column<Student>}) => (
          <div className={`h-10 flex items-center ${column.columnDef.meta?.align === 'right' ? 'justify-end' : 'justify-start'}`}>
            <Skeleton className='h-2 rounded-full w-full' />
          </div>)
      }
    })
    : columns,
  [loading, data])

  const dataTable = useMemo(() => loading || (data === false)
    ? Array(30).fill({})
    : data,
  [loading, data])

  const table = useReactTable({
    data: dataTable,
    columns: columnsTable,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedUniqueValues: (table, columnId) => {
      if (columnId === 'expand') {
        return () => {
          const facetedRowModel = table.getColumn(columnId)?.getFacetedRowModel()
          if (!facetedRowModel) return new Map()
          const facetedUniqueValues = new Map<string, number>()
          const values = facetedRowModel.flatRows.flatMap(row => row.getValue<string[]>(columnId))
          values.forEach(subject => {
            if (facetedUniqueValues.has(subject)) {
              const quantity = facetedUniqueValues.get(subject) ?? 0
              facetedUniqueValues.set(subject, quantity + 1)
            } else {
              facetedUniqueValues.set(subject, 1)
            }
          })
          return facetedUniqueValues
        }
      }
      return getFacetedUniqueValues()(table, columnId)
    },
    initialState: {
      expanded: {},
      columnVisibility: { },
      columnPinning: { left: ['expand', 'curso', 'estudiante'] }
    }
  })

  return (
    <div className='w-full grid grid-cols-7 gap-x-8 gap-y-4 px-8'>
      <Tabs
        value={url}
        onValueChange={(value:string) => {
          setLoading(true)
          setUrl(value)
          table.resetColumnFilters()
          table.resetSorting()
        }}
        className='shadow-sm'
      >
        <TabsList className='w-full'>
          <TabsTrigger value={URL_TRAYECTORIA_2023} className='w-full'>2023</TabsTrigger>
          <TabsTrigger value={URL_TRAYECTORIA_2024} className='w-full'>2024</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className='col-span-6 col-start-2 flex justify-between items-center'>
        <SearchBar table={table} />
        <ColumnsVisibility className='bg-success text-success-foreground' table={table} />
      </div>
      <FiltersPanel table={table} />
      <StudentsTable loading={loading} table={table} />
    </div>
  )
}
