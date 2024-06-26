import { ColumnDef, Row } from '@tanstack/react-table'
import { type Student } from '@/types'
import { pendientesFilterValueState } from '@/app/table/filters/pendientesFilter'
import { Badge } from '@/components/ui/badge'
import { CURSO } from '@/constants'

export const columns: ColumnDef<Student>[] = [
  {
    id: 'curso',
    accessorFn: originalRow => [originalRow.anio, originalRow.division],
    header: () => <div className='text-center font-bold'>Curso</div>,
    cell: ({ row: { original } }) => <Badge variant='outline' className='mx-6'>{`${original.anio}° ${original.division}°`}</Badge>,
    size: 120,
    filterFn: (row: Row<Student>, _columnID: string, filterValue: CURSO[]) => {
      const { anio, division } = row.original
      const curso = `${anio}° ${division}°`
      return filterValue.includes(curso as CURSO)
    },
    sortingFn: (rowA, rowB) => {
      const anioA = rowA.original.anio ?? 0
      const anioB = rowB.original.anio ?? 0
      const divisionA = rowA.original.division ?? 0
      const divisionB = rowB.original.division ?? 0
      return anioA - anioB !== 0 ? anioA - anioB : divisionA - divisionB
    }
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
    accessorKey: 'dni',
    header: () => <div className='text-center font-bold'>DNI</div>,
    cell: ({ row }) => <p className='text-center mx-6'>{row.original.dni}</p>,
    size: 150,
    sortingFn: (rowA, rowB) => {
      const dniA = rowA.original.dni ?? 0
      const dniB = rowB.original.dni ?? 0
      return dniA - dniB /* !== 0 ? anioA - anioB : divisionA - divisionB */
    }
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
