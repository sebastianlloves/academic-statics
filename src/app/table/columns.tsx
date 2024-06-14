import { ColumnDef } from '@tanstack/react-table'
import { type Student } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { LOADING_DATA } from '@/utils/formatData'

export const columns: ColumnDef<Student | typeof LOADING_DATA[number]>[] = [
  {
    id: 'curso',
    header: () => <div className='text-center font-bold mx-6'>Curso</div>,
    cell: ({ row: { original } }) => original.dni === 'loading'
      ? <Skeleton className='h-[26px] m-0 p-0' />
      : <Badge variant='outline'>{`${original.anio}° ${original.division}°`}</Badge>
  },
  {
    id: 'estudiante',
    header: () => (
      <div className='text-center font-bold'>Estudiante</div>
    ),
    cell: ({ row: { original } }) => {
      return (original.apellido === 'loading'
        ? <Skeleton className='h-[26px] m-0 p-0' />
        : <p className='text-left'>{`${original.apellido}, ${original.nombre}`}</p>
      )
    }
  },
  {
    id: 'dni',
    header: () => <div className='text-center font-bold'>DNI</div>,
    cell: ({ row }) => {
      return (row.original.dni === 'loading'
        ? <Skeleton className='h-[26px] m-0 p-0' />
        : <p className='text-right'>{row.original.dni}</p>
      )
    }
  },
  {
    id: 'troncales',
    header: () => <div className='text-center font-bold'>Troncales</div>,
    columns: [
      {
        id: 'cantTroncales',
        header: () => <div className='text-center'>Cantidad</div>,
        cell: ({ row }) => {
          return (row.original.dni === 'loading'
            ? <Skeleton className='h-[26px] m-0 p-0' />
            : <p className='text-center w-full border'>{row.original.materiasPendientes.cantTroncales}</p>
          )
        }
      },
      {
        id: 'detalleTroncales',
        header: () => <div className='text-center'>Detalle</div>,
        cell: ({ row }) => {
          return (row.original.dni === 'loading'
            ? <Skeleton className='h-[26px] m-0 p-0' />
            : <p className='text-right'>{row.original.materiasPendientes.detalleTroncales}</p>
          )
        }
      }
    ]

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
