import { ColumnDef, Row } from '@tanstack/react-table'
import { type Student } from '@/types'
import { materiasFilterValueState } from '@/app/table/filters/materiasFilter'
import { Badge } from '@/components/ui/badge'
import { CURSO } from '@/types'
import SortingHeader from './sortingHeader'
import SubRow from './subRow'

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
      return <div className='text-left mx-6'><p className='font-normal my-0'>{apellido}</p><p className='font-light my-0'>{nombre}</p></div>
    },
    size: 250,
    sortingFn: 'text',
    enableMultiSort: true
  },
  {
    id: 'dni',
    accessorKey: 'dni',
    header: ({ column }) => (
      <SortingHeader title='DNI' column={column} />
    ),
    cell: ({ row }) => (
      <div className='flex items-start'>
        <p className='text-left text-xs text-muted-foreground'>{row.original.dni}</p>
      </div>),
    size: 150,
    sortingFn: 'basic',
    enableMultiSort: true
  },
  {
    id: 'troncales',
    accessorFn: (row) => {
      const { cantTroncales, detalleTroncales } = row.materiasPendientes
      return { cantTroncales, detalleTroncales }
    },
    header: ({ column, table }) => (
      <>
        <SortingHeader title='Troncales' column={column} />
        <button onClick={() => table.toggleAllRowsExpanded()}>+</button>
      </>
    ),
    cell: ({ row, cell }) => {
      const { cantTroncales, detalleTroncales } = cell.getValue<{cantTroncales: number, detalleTroncales: string[]}>()
      return (
        <div>
          <SubRow triggerContent={cantTroncales} subjects={detalleTroncales} handleClick={() => row.toggleExpanded()} />
          {/* <p className='text-center font-medium text-muted-foreground'>{`${cell.getValue() ?? ''}`}</p>
          <button onClick={() => row.toggleExpanded()}>+</button>
          <p>{row.getIsExpanded() && 'Expandida'}</p> */}
        </div>
      )
    },
    filterFn: pendientesFilterFn,
    sortingFn: 'basic',
    size: 250
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
