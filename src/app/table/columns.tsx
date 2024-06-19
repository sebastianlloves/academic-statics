import { ColumnDef, Row } from '@tanstack/react-table'
import { type Student } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { LOADING_DATA } from '@/constants'

export const columns: ColumnDef<Student | typeof LOADING_DATA[number]>[] = [
  {
    id: 'curso',
    header: () => <div className='text-center font-bold'>Curso</div>,
    cell: ({ row: { original } }) => original.dni === 'loading'
      ? <Skeleton className='h-[26px] m-0 p-0' />
      : <Badge variant='outline' className='mx-6'>{`${original.anio}° ${original.division}°`}</Badge>,
    size: 120
  },
  {
    id: 'estudiante',
    header: () => (
      <div className='text-center font-bold'>Estudiante</div>
    ),
    cell: ({ row: { original } }) => {
      return (original.apellido === 'loading'
        ? <Skeleton className='h-[26px] m-0 p-0' />
        : <p className='text-left mx-6'>{`${original.apellido}, ${original.nombre}`}</p>
      )
    },
    size: 300
  },
  {
    id: 'dni',
    header: () => <div className='text-center font-bold'>DNI</div>,
    cell: ({ row }) => {
      return (row.original.dni === 'loading'
        ? <Skeleton className='h-[26px] m-0 p-0' />
        : <p className='text-center mx-6'>{row.original.dni}</p>
      )
    },
    size: 80
  },
  {
    id: 'troncales',
    header: () => <div className='text-center font-bold'>Troncales</div>,
    cell: ({ row }) => {
      return (row.original.dni === 'loading'
        ? <Skeleton className='h-[26px] m-0 p-0' />
        : (
          <div className='flex items-center space-x-4 mx-6'>
            <Badge variant='outline'>{row.original.materiasPendientes.cantTroncales}</Badge>
            <p className='text-left text-nowrap'>{row.original.materiasPendientes.detalleTroncales}</p>
          </div>
          )
      )
    },
    filterFn: (row: Row<Student | typeof LOADING_DATA[number]>, _columnID, filterValue: string | number[]) => {
      const { cantTroncales } = row.original.materiasPendientes
      if (cantTroncales) return cantTroncales >= filterValue[0] && cantTroncales <= filterValue[1]
      return false
    },
    size: 400
  }
]

/* /* {headerGroup.headers.map((header) => {
                console.log(header.id, header.isPlaceholder, header.column, header.colSpan, header.subHeaders, header.getLeafHeaders())
                return (
                  <TableHead key={header.id} colSpan={header.colSpan} className='text-foreground text-center border'>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })} */
