import { ColumnDef, Row } from '@tanstack/react-table'
import { type Student } from '@/types'
import { materiasFilterValueState } from '@/app/table/filters/materiasFilter'
import { Badge } from '@/components/ui/badge'
import { CURSO } from '@/types'
import SortingHeader from './sortingHeader'
import SubRow from './subRow'
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<Student>[] = [
  {
    id: 'curso',
    accessorFn: ({ anio, division }) => `${anio}° ${division}°`,
    header: ({ column }) => (
      <SortingHeader title='Curso' column={column} />
    ),
    cell: ({ cell }) => (
      <div className='h-10 flex flex-col items-start justify-center'>
        <Badge variant='outline'>{cell.getValue() as string}</Badge>
      </div>
    ),
    size: 100,
    filterFn: (row: Row<Student>, columnID: string, filterValue: CURSO[]) => filterValue.includes(row.getValue(columnID) as CURSO),
    sortingFn: 'alphanumeric'
  },
  {
    id: 'estudiante',
    accessorKey: 'apellido',
    header: ({ column }) => (
      <SortingHeader title='Estudiante' column={column} />
    ),
    cell: ({ row }) => {
      const { apellido, nombre } = row.original
      const capitalizeApellido = apellido?.split(' ').map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ')
      const capitalizeNombre = nombre?.split(' ').map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ')
      return (
        <div className='text-left h-10'>
          <p className='font-medium'>{capitalizeApellido}</p>
          <p className='font-normal text-muted-foreground'>{capitalizeNombre}</p>
        </div>
      )
    },
    sortingFn: 'text',
    size: 180
  },
  {
    id: 'dni',
    accessorKey: 'dni',
    header: ({ column }) => (
      <SortingHeader title='DNI' column={column} />
    ),
    cell: ({ row }) => (
      <div className='h-10 flex flex-col justify-center'>
        <p className='text-left text-xs text-muted-foreground'>{row.original.dni}</p>
      </div>),
    size: 150,
    sortingFn: 'basic'
  },
  {
    id: 'troncales',
    accessorKey: 'materiasPendientes.cantTroncales',
    header: ({ column }) => (
      <div className='flex gap-x-2 items-center'>
        <SortingHeader title='Troncales' column={column} className='' />
      </div>
    ),
    cell: ({ table, row }) => (
      <SubRow
        triggerContent={row.original.materiasPendientes.cantTroncales ?? 0}
        subjects={row.original.materiasPendientes.detalleTroncales ?? []}
        open={table.getIsAllRowsExpanded() || row.getIsExpanded()}
      />
    ),
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
    cell: ({ table, row }) => (
      <SubRow
        triggerContent={row.original.materiasPendientes.cantGenerales ?? 0}
        subjects={row.original.materiasPendientes.detalleGenerales ?? []}
        open={table.getIsAllRowsExpanded() || row.getIsExpanded()}
      />
    ),
    filterFn: pendientesFilterFn,
    sortingFn: 'basic',
    size: 250
  },
  {
    id: 'enProceso2020',
    accessorKey: 'materiasEnProceso2020.cantidad',
    header: ({ column }) => (
      <SortingHeader title='En Proceso 2020' column={column} />
    ),
    cell: ({ table, row }) => (
      <SubRow
        triggerContent={row.original.materiasEnProceso2020.cantidad ?? 0}
        subjects={row.original.materiasEnProceso2020.detalle ?? []}
        open={table.getIsAllRowsExpanded() || row.getIsExpanded()}
      />
    ),
    filterFn: enProcesoFilterFn,
    sortingFn: 'basic',
    size: 250
  },
  {
    id: 'expand',
    header: ({ table }) => (
      <Button variant='ghost' size='sm' className='w-7 p-0' onClick={() => table.toggleAllRowsExpanded(!table.getIsAllRowsExpanded())}>
        {table.getIsAllRowsExpanded()
          ? <ChevronsDownUp strokeWidth='1.2px' size={15} className='text-foreground' />
          : <ChevronsUpDown strokeWidth='1.2px' size={15} className='text-foreground' />}
        <span className='sr-only'>Toggle</span>
      </Button>
    ),
    cell: ({ row }) => (
      <div className='h-10 flex flex-col justify-center'>
        <Button variant='ghost' size='sm' className='w-7 p-0' onClick={() => row.toggleExpanded()}>
          {row.getIsExpanded()
            ? <ChevronsDownUp strokeWidth='0.9px' size={15} className='text-foreground/80' />
            : <ChevronsUpDown strokeWidth='0.9px' size={15} className='text-foreground/80' />}
          <span className='sr-only'>Toggle</span>
        </Button>
      </div>
    ),
    enableColumnFilter: false,
    enableSorting: false,
    size: 50
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
