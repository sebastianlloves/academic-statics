import { flexRender, Table as TableType } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { columns } from './columns'
import { Student } from '@/types'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import TableFooter from './tableFooter'

interface TableProps {
  table: TableType<Student>,
  loading: boolean
}

export function StudentsTable ({ table, loading }: TableProps) {
  console.log(loading)
  return (

    <div className='h-[85vh] min-h-[85vh] flex flex-col col-span-6 bg-background-grey w-full border border-input/60 shadow-sm rounded-lg'>
      <ScrollArea className='h-full bg-table rounded-t-lg'>
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
        isloading={loading}
        totalQuantity={table.getCoreRowModel().rows.length}
        filteredQuantity={table.getRowModel().rows.length}
      />
    </div>
  )
}
