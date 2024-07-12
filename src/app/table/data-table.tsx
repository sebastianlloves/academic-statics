import { flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, getSortedRowModel, getExpandedRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { columns } from './columns'
import { Student } from '@/types'
import { useMemo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import FiltersPanel from './filters/filtersPanel'

interface DataTableProps {
  data: Student[] | false,
  loading: boolean
}

export function DataTable ({ data, loading }: DataTableProps) {
  const columnsTable = useMemo(() => loading || data === false
    ? columns.map(column => { return { ...column, cell: () => <Skeleton className='h-6 rounded-md' /> } })
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
          const facetedRowModel = table.getColumn('expand')?.getFacetedRowModel()
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
      columnVisibility: { promocion: false, enProceso2020: false }
    }
  })
  console.log(table.getColumn('troncales')?.getFacetedUniqueValues())
  console.log(table.getColumn('expand')?.getFacetedRowModel())
  console.log(table.getColumn('expand')?.getFacetedUniqueValues())

  return (
    <div className='flex gap-x-4 border p-8 rounded-lg'>
      <ScrollArea className='relative h-[80vh] min-h-[80vh] w-[70vw] rounded-lg shadow-sm'>
        <Table className=''>
          <TableHeader className=''>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className='sticky top-0 bg-background border-b-0 outline outline-1 outline-primary/50 hover:bg-background shadow-sm shadow-primary/50 p-6' key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead align='left' className='py-2 text-foreground' style={{ width: header.column.getSize(), maxWidth: header.column.getSize() }} key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>)
                )}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className=''>
            {table.getRowModel().rows?.length
              ? (table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      align='left'
                      style={{ width: cell.column.getSize(), maxWidth: cell.column.getSize() }}
                      className='align-top'
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                ))
                )
              : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='text-center text-muted-foreground italic py-6'>
                    No hay resultados.
                  </TableCell>
                </TableRow>
                )}
          </TableBody>
        </Table>
        <div className='sticky bottom-0 bg-muted py-2'>{`Mostrando ${table.getRowModel().rows.length} de ${table.getCoreRowModel().rows.length}`}</div>
      </ScrollArea>
      <FiltersPanel table={table} />
    </div>
  )
}
