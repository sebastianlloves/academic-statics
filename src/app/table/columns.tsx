import { ColumnDef, Row } from '@tanstack/react-table'
import { type Student } from '@/types'
import { pendientesFilterValueState } from '@/app/table/filters/pendientesFilter'
import { Badge } from '@/components/ui/badge'
import { CURSO } from '@/constants'

export const columns: ColumnDef<Student>[] = [
  {
    id: 'curso',
    accessorFn: ({ anio, division }) => `${anio}° ${division}°`,
    header: () => <div className='text-center font-bold'>Curso</div>,
    cell: ({ cell }) => <Badge variant='outline' className='mx-6'>{cell.getValue() as string}</Badge>,
    size: 120,
    filterFn: (row: Row<Student>, columnID: string, filterValue: CURSO[]) => filterValue.includes(row.getValue(columnID) as CURSO),
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
    accessorFn: ({ apellido, nombre }) => {
      const capitalizeApellido = apellido?.split(' ').map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ')
      const capitalizeNombre = nombre?.split(' ').map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ')
      return `${capitalizeApellido}, ${capitalizeNombre}`
    },
    header: () => (
      <div className='text-center font-bold'>Estudiante</div>
    ),
    cell: ({ cell }) => {
      const [apellido, nombre] = `${cell.getValue()}`.split(', ')
      return <p className='text-left mx-6'><span className='font-normal'>{apellido}</span>, <span className='font-light'>{nombre}</span></p>
    },
    size: 300,
    sortingFn: 'text'
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
      return dniA - dniB
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
