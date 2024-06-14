import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, PaginationState } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue> ({ columns, data }: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({ pageSize: 100, pageIndex: 0 })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel({ initialSync: true }),
    onPaginationChange: setPagination,
    state: {
      pagination
    }
  })
  // console.log(table.getHeaderGroups())

  return (
    <>
      <div className='border rounded-md'>
        <Table>
          <TableHeader className='bg-background/95'>
            <TableRow key={table.getHeaderGroups()[1].id}>
              {table.getHeaderGroups()[0].headers.map((header, index) => {
                console.log(header)
                if (header.isPlaceholder) {
                  const header = table.getHeaderGroups()[1].headers[index]
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan} className='text-foreground text-center'>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                } else {
                  console.log(header.getLeafHeaders().filter(obj => obj.depth === 2))
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan} className='text-foreground  h-min'>
                      <div className=' grid grid-cols-2 grid-rows-2'>
                        <p className=' col-span-2 flex justify-center'>{flexRender(header.column.columnDef.header, header.getContext())}</p>
                        {header.getLeafHeaders().filter(obj => obj.depth === 2).map(header => (
                          <p key={header.id} className=' text-xs h-min font-normal flex justify-center'>{flexRender(header.column.columnDef.header, header.getContext())}</p>
                        ))}
                      </div>
                    </TableHead>
                  )
                }
              })}

            </TableRow>
          </TableHeader>
          <TableBody className=''>
            {table.getRowModel().rows?.length
              ? (table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className=' even:bg-muted/45 dark:even:bg-muted/30'>
                  {row.getVisibleCells().map((cell) => (

                    <TableCell key={cell.id} align='center'>
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
