import { flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, getSortedRowModel, getExpandedRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, Column } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { columns } from './columns'
import { Student } from '@/types'
import { useMemo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import FiltersPanel from './filters/filtersPanel'

interface DataTableProps {
  data: Student[] | false,
  loading: boolean
}

export function DataTable ({ data, loading }: DataTableProps) {
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
      columnVisibility: { promocion: false, enProceso2020: false },
      columnPinning: { left: ['expand', 'curso', 'estudiante'] }
    }
  })

  return (
    <div className='flex gap-x-4 p-8 rounded-lg bg-table'>
      <div>
        <ScrollArea className='border h-[80vh] min-h-[80vh] w-[70vw] rounded-lg shadow-sm bg-background'>
          <Table className='grid w-max min-w-full bg-background'>
            <TableHeader className='sticky top-0 w-full border-primary/100 border-b shadow-sm shadow-primary/40 z-20'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className='bg-background hover:bg-background flex items-center gap-x-8 px-3 py-1' key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      align={header.column.columnDef.meta?.align || 'left'}
                      className='text-foreground px-0'
                      style={{
                        width: `${header.column.getSize()}px`,
                        position: header.column.getIsPinned() ? 'sticky' : undefined,
                        left: header.column.getIsPinned() ? `${header.column.getStart('left')}px` : undefined,
                        zIndex: header.column.getIsPinned() ? 10 : undefined
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
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className={`flex gap-x-8 px-3 ${row.getIsExpanded() && 'shadow-[inset_0px_0px_3px_0px_rgb(0,0,0,0.05)]'}`}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        align={cell.column.columnDef.meta?.align || 'left'}
                        className='bg-background h-full align-top my-2.5 p-0'
                        style={{
                          width: `${cell.column.getSize()}px`,
                          position: cell.column.getIsPinned() ? 'sticky' : undefined,
                          left: cell.column.getIsPinned() ? `${cell.column.getStart('left')}px` : undefined,
                          zIndex: cell.column.getIsPinned() ? 10 : 0
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
        {/* <div className='sticky bottom-0 bg-muted py-2 z-30'>{`Mostrando ${table.getRowModel().rows.length} de ${table.getCoreRowModel().rows.length}`}</div> */}
      </div>
      <FiltersPanel table={table} />
    </div>
  )
}
