import { ColumnDef, Row } from '@tanstack/react-table'
import { type Student } from '@/types'
import { pendientesFilterValueState } from '@/app/table/filters/troncalesFilter'
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
    size: 150
  },
  {
    id: 'troncales',
    header: () => <div className='text-center font-bold'>Troncales</div>,
    cell: ({ row }) => <p className='text-center mx-6'>{row.original.materiasPendientes.cantTroncales}</p>,
    filterFn: pendientesFilterFn,
    size: 100
  },
  {
    id: 'generales',
    header: () => <div className='text-center font-bold'>Generales</div>,
    cell: ({ row }) => <p className='text-center mx-6'>{row.original.materiasPendientes.cantGenerales}</p>,
    filterFn: pendientesFilterFn,
    size: 100
  }
]

function pendientesFilterFn (row: Row<Student>, _columnID: string, filterValue: pendientesFilterValueState) : boolean {
  const { cantTroncales, cantGenerales } = row.original.materiasPendientes
  if (cantTroncales === undefined || cantGenerales === undefined) return false
  const isInTroncalesRange = cantTroncales >= filterValue.troncalesRange[0] && cantTroncales <= filterValue.troncalesRange[1]
  const isInGeneralesRange = cantGenerales >= filterValue.generalesRange[0] && cantGenerales <= filterValue.generalesRange[1]
  const isValidPromotedCondition = filterValue.promotedAndRepetears === 'onlyPromoted'
    ? cantTroncales <= 2 && cantTroncales + cantGenerales <= 4
    : filterValue.promotedAndRepetears === 'onlyRepeaters'
      ? cantTroncales > 2 || cantTroncales + cantGenerales > 4
      : true

  return isInTroncalesRange && isInGeneralesRange && isValidPromotedCondition
}
