import { ColumnDef, Row } from '@tanstack/react-table'
import { type Student } from '@/types'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Student>[] = [
  {
    id: 'curso',
    header: () => <div className='text-center font-bold'>Curso</div>,
    cell: ({ row: { original } }) => <Badge variant='outline' className='mx-6'>{`${original.anio}° ${original.division}°`}</Badge>,
    size: 120
  },
  {
    id: 'estudiante',
    header: () => (
      <div className='text-center font-bold'>Estudiante</div>
    ),
    cell: ({ row: { original } }) => <p className='text-left mx-6'>{`${original.apellido}, ${original.nombre}`}</p>,
    size: 300
  },
  {
    id: 'dni',
    header: () => <div className='text-center font-bold'>DNI</div>,
    cell: ({ row }) => <p className='text-center mx-6'>{row.original.dni}</p>,
    size: 80
  },
  {
    id: 'troncales',
    header: () => <div className='text-center font-bold'>Troncales</div>,
    cell: ({ row }) => (
      <div className='flex items-center space-x-4 mx-6 overflow-hidden'>
        <Badge variant='outline'>{row.original.materiasPendientes.cantTroncales}</Badge>
        <p className='text-left text-nowrap'>{row.original.materiasPendientes.detalleTroncales}</p>
      </div>
    ),
    filterFn: (row: Row<Student>, _columnID, filterValue: number[]) => {
      const { cantTroncales } = row.original.materiasPendientes
      return cantTroncales !== undefined && cantTroncales >= filterValue[0] && cantTroncales <= filterValue[1]
    },
    size: 400
  }
]
