import { ColumnDef, Row } from '@tanstack/react-table'
import { type Student } from '@/types'
import { materiasFilterValueState } from '@/app/table/filters/materiasFilter'
import { Badge } from '@/components/ui/badge'
import { CURSO } from '@/constants'
import SortingHeader from './sortingHeader'

export const columns: ColumnDef<Student>[] = [
  {
    id: 'curso',
    accessorFn: ({ anio, division }) => `${anio}° ${division}°`,
    header: ({ column }) => (
      <SortingHeader title='Curso' column={column} />
    ),
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
    header: ({ column }) => (
      <SortingHeader title='Estudiante' column={column} />
    ),
    cell: ({ cell }) => {
      const [apellido, nombre] = `${cell.getValue()}`.split(', ')
      return <p className='text-left mx-6'><span className='font-normal'>{apellido}</span>, <span className='font-light'>{nombre}</span></p>
    },
    size: 300,
    sortingFn: 'text',
    enableMultiSort: true
  },
  {
    id: 'dni',
    accessorKey: 'dni',
    header: ({ column }) => (
      <SortingHeader title='DNI' column={column} />
    ),
    cell: ({ row }) => <p className='text-center text-xs text-muted-foreground mx-6'>{row.original.dni}</p>,
    size: 150,
    sortingFn: 'basic',
    enableMultiSort: true
  },
  {
    id: 'troncales',
    accessorKey: 'materiasPendientes.cantTroncales',
    header: ({ column }) => (
      <SortingHeader title='Troncales' column={column} />
    ),
    cell: ({ cell }) => <p className='text-center font-medium text-muted-foreground'>{`${cell.getValue() ?? ''}`}</p>,
    filterFn: pendientesFilterFn,
    sortingFn: 'basic',
    size: 150
  },
  {
    id: 'generales',
    accessorKey: 'materiasPendientes.cantGenerales',
    header: ({ column }) => (
      <SortingHeader title='Generales' column={column} />
    ),
    cell: ({ cell }) => <p className='text-center font-medium text-muted-foreground'>{`${cell.getValue() ?? ''}`}</p>,
    filterFn: pendientesFilterFn,
    sortingFn: 'basic',
    size: 150
  },
  {
    id: 'enProceso2020',
    accessorKey: 'materiasEnProceso2020.cantidad',
    header: ({ column }) => (
      <SortingHeader title='En Proceso 2020' column={column} />
    ),
    cell: ({ cell }) => <p className='text-center font-medium text-muted-foreground'>{`${cell.getValue() ?? ''}`}</p>,
    filterFn: enProcesoFilterFn,
    sortingFn: 'basic',
    size: 200
  }
]

function pendientesFilterFn (row: Row<Student>, _columnID: string, filterValue: materiasFilterValueState) {
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

function enProcesoFilterFn (row: Row<Student>, _columnID: string, filterValue: materiasFilterValueState) {
  const { cantidad } = row.original.materiasEnProceso2020
  if (cantidad === undefined) return false
  const [min, max] = filterValue.enProceso2020Range
  return cantidad >= min && cantidad <= max
}
