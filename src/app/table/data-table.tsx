import { flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, getSortedRowModel, getExpandedRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, Column } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { columns } from './columns'
import { Student } from '@/types'
import { useMemo, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import FiltersPanel from './filters/filtersPanel'
import SearchBar from './searchBar'
import ColumnsVisibility from './filters/filterInputs/columnsVisibility'
import TableFooter from './tableFooter'
import { URL_TRAYECTORIA_2023, URL_TRAYECTORIA_2024 } from '@/constants'
import useStudentsData from '@/hooks/useStudentsData'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function DataTable () {
  const [url, setUrl] = useState(URL_TRAYECTORIA_2024)
  const { data, loading } = useStudentsData(url)

  const columnsTable = useMemo(() => loading || data === false
    ? columns.map(column => {
      return {
        ...column,
        cell: ({ column } : {column: Column<Student>}) => (
          <div className={`h-10 flex items-center ${column.columnDef.meta?.align === 'right' ? 'justify-end' : 'justify-start'}`}>
            <Skeleton className='h-2 rounded-full w-full' />
          </div>
        )
      }
    })
    : columns,
  [loading, data])

  const dataTable = useMemo(() => loading || data === false
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
      <Tabs value={url} onValueChange={(value) => setUrl(value)} className='shadow-sm'>
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
      <div className='col-span-6 bg-background-grey w-full border border-input/60 shadow-sm rounded-lg'>
        <ScrollArea className='h-[80vh] min-h-[80vh] bg-table rounded-t-lg'>
          <Table className='grid w-max min-w-full bg-table'>
            <TableHeader className='sticky top-0 w-full border-primary/100 border-b shadow-sm shadow-primary/40 z-20'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className='bg-table-header hover:bg-table-header flex items-center py-1 px-2' key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      align={header.column.columnDef.meta?.align || 'left'}
                      className='text-foreground px-3 bg-table-header hover:bg-table-header'
                      style={{
                        width: `${header.column.getSize()}px`,
                        position: header.column.getIsPinned() ? 'sticky' : undefined,
                        left: header.column.getIsPinned() ? `${header.column.getStart('left')}px` : undefined,
                        zIndex: header.column.getIsPinned() ? 10 : undefined,
                        marginInline: header.column.getIsPinned() ? '0px' : '10px'
                      }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className=''>
              {table.getRowModel().rows?.length
                ? (table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className='flex bg-table hover:bg-muted px-2'>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        align={cell.column.columnDef.meta?.align || 'left'}
                        className='bg-inherit h-full my-2.5 p-0 px-3'
                        style={{
                          width: `${cell.column.getSize()}px`,
                          position: cell.column.getIsPinned() ? 'sticky' : undefined,
                          left: cell.column.getIsPinned() ? `${cell.column.getStart('left')}px` : undefined,
                          zIndex: cell.column.getIsPinned() ? 10 : 0,
                          marginInline: cell.column.getIsPinned() ? '0px' : '10px'
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  ))
                  )
                : (
                  <TableRow className='flex justify-center items-center'>
                    <TableCell colSpan={columns.length} className='text-center text-muted-foreground italic py-6'>
                      No hay resultados.
                    </TableCell>
                  </TableRow>
                  )}
            </TableBody>
          </Table>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
        <TableFooter
          isloading={loading || data === false}
          totalQuantity={table.getCoreRowModel().rows.length}
          filteredQuantity={table.getRowModel().rows.length}
        />
      </div>
    </div>
  )
}
