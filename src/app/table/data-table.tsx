import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { columns } from './columns'
import { Button } from '@/components/ui/button'
import TroncalesFilter from './filters/troncalesFilter'
import CursoFilter from './filters/cursosFilter'
import { Student } from '@/types'
import { useMemo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

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
    ? Array(30)
    : data,
  [loading, data])
  const table = useReactTable({
    data: dataTable,
    columns: columnsTable,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 100 }
    }
  })

  return (
    <>
      <div className='flex items-center gap-x-3'>
        <TroncalesFilter table={table} />
        <CursoFilter table={table} />
      </div>
      <div className='border rounded-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className='py-2' style={{
                        width: header.column.getSize(),
                        maxWidth: header.column.getSize()
                      }} key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className=''>
            {table.getRowModel().rows?.length
              ? (table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id} data-state={row.getIsSelected() && 'selected'}
                  className=' even:bg-muted/45 dark:even:bg-muted/30'
                >
                  {row.getVisibleCells().map((cell) => (

                    <TableCell
                      key={cell.id} align='center' style={{
                        width: cell.column.getSize(),
                        maxWidth: cell.column.getSize()
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                ))
                )
              : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      <div className='flex justify-center gap-4'>
        <Button variant='outline' disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Anterior</Button>
        <Button variant='outline' disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Siguiente</Button>
      </div>
    </>
  )
}
