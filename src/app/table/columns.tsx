import { ColumnDef } from '@tanstack/react-table'
import { type Student } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { LOADING_DATA } from '@/utils/formatData'

export const columns: ColumnDef<Student | typeof LOADING_DATA[number]>[] = [
  {
    id: 'curso',
    header: () => <div className='text-center font-bold w-24'>Curso</div>,
    cell: ({ row: { original } }) => original.dni === 'loading'
      ? <Skeleton className='h-[26px] m-0 p-0' />
      : <Badge variant='outline'>{`${original.anio}° ${original.division}°`}</Badge>
  },
  {
    id: 'estudiante',
    header: () => (
      <div className='text-center font-bold w-64'>Estudiante</div>
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
    header: () => <div className='text-center font-bold w-24'>DNI</div>,
    cell: ({ row }) => {
      return (row.original.dni === 'loading'
        ? <Skeleton className='h-[26px] m-0 p-0' />
        : <p className='text-right'>{row.original.dni}</p>
      )
    }
  },
  {
    id: 'dni',
    header: () => <div className='text-center font-bold w-24'>DNI</div>,
    cell: ({ row }) => {
      return (row.original.dni === 'loading'
        ? <Skeleton className='h-[26px] m-0 p-0' />
        : <p className='text-right'>{row.original.dni}</p>
      )
    }
  }
]
