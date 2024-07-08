import { flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, getSortedRowModel, getExpandedRowModel } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { columns } from './columns'
import { Student } from '@/types'
import { useMemo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import FiltersPanel from './filters/filtersPanel'
// import CantidadesFilter from './filters/cantidadesFilter/cantidadesFilter'

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
    initialState: {
      expanded: {},
      columnVisibility: { promocion: false, enProceso2020: false }
    }
  })

  return (
    <>
      <FiltersPanel table={table} />
      <ScrollArea className='h-[80vh] max-w-[80vw] rounded-md'>
        <Table className='relative'>
          <TableHeader className=''>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className='sticky top-0 bg-background border-b-0 outline outline-1 outline-primary/50 hover:bg-background' key={headerGroup.id}>
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
      </ScrollArea>
    </>
  )
}
