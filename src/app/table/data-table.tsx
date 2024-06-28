import { flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { columns } from './columns'
import PendientesFilter from './filters/materiasFilter'
import CursoFilter from './filters/cursosFilter'
import { Student } from '@/types'
import { useMemo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'

interface DataTableProps {
  data: Student[],
  loading: boolean
}

export function DataTable ({ data, loading }: DataTableProps) {
  const columnsTable = useMemo(() => loading
    ? columns.map(column => { return { ...column, cell: () => <Skeleton className='h-6 rounded-md' /> } })
    : columns,
  [loading])
  const dataTable = useMemo(() => loading
    ? Array(30).fill({})
    : data,
  [loading, data])

  const table = useReactTable({
    data: dataTable,
    columns: columnsTable,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
    }
  })

  return (
    <>
      <div className='flex items-center gap-x-3'>
        <PendientesFilter table={table} />
        <CursoFilter table={table} />
      </div>
      <ScrollArea className='h-[80vh] rounded-md w-max'>
        <Table className='relative'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className='sticky top-0 bg-background border-b-0 outline outline-1 outline-primary/50 hover:bg-background' key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead className='py-2 text-foreground' style={{ width: header.column.getSize(), maxWidth: header.column.getSize() }} key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>)
                )}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className=''>
            {table.getRowModel().rows?.length
              ? (table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className=''>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} align='center' style={{ width: cell.column.getSize(), maxWidth: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                ))
                )
              : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No se hallaron resultados.
                  </TableCell>
                </TableRow>
                )}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  )
}
