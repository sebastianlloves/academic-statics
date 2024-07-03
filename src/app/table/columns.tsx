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
      return (
        <div className='text-left h-10'>
          <p className='font-normal'>{apellido}</p>
          <p className='font-light'>{nombre}</p>
        </div>
      )
    },
    size: 180,
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
      <div className='h-10 flex flex-col justify-center'>
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
    header: ({ column }) => (
      <div className='flex gap-x-2 items-center'>
        <SortingHeader title='Troncales' column={column} className='' />
      </div>
    ),
    cell: ({ table, row }) => (
      <SubRow
        triggerContent={row.original.materiasPendientes.cantTroncales ?? 0}
        subjects={row.original.materiasPendientes.detalleTroncales ?? []}
        open={{ tableExpanded: table.getIsAllRowsExpanded(), rowExpanded: row.getIsExpanded() }}
      />
    ),
    filterFn: pendientesFilterFn,
    sortingFn: (rowA, rowB) => {
      const { cantTroncales: cantA } = rowA.getValue<{cantTroncales: number}>('troncales')
      const { cantTroncales: cantB } = rowB.getValue<{cantTroncales: number}>('troncales')
      return cantA - cantB
    },
    size: 250
  },
  {
    id: 'generales',
    accessorFn: (row) => {
      const { cantGenerales, detalleGenerales } = row.materiasPendientes
      return { cantGenerales, detalleGenerales }
    },
    header: ({ column }) => (
      <SortingHeader title='Generales' column={column} />
    ),
    cell: ({ table, row }) => (
      <SubRow
        triggerContent={row.original.materiasPendientes.cantGenerales ?? 0}
        subjects={row.original.materiasPendientes.detalleGenerales ?? []}
        open={{ tableExpanded: table.getIsAllRowsExpanded(), rowExpanded: row.getIsExpanded() }}
      />
    ),
    filterFn: pendientesFilterFn,
    sortingFn: (rowA, rowB) => {
      const { cantGenerales: cantA } = rowA.getValue<{cantGenerales: number}>('generales')
      const { cantGenerales: cantB } = rowB.getValue<{cantGenerales: number}>('generales')
      return cantA - cantB
    },
    size: 150
  },
  {
    id: 'enProceso2020',
    accessorFn: (row) => {
      const { cantidad, detalle } = row.materiasEnProceso2020
      return { cantidad, detalle }
    },
    header: ({ column }) => (
      <SortingHeader title='En Proceso 2020' column={column} />
    ),
    cell: ({ table, row }) => (
      <SubRow
        triggerContent={row.original.materiasEnProceso2020.cantidad ?? 0}
        subjects={row.original.materiasEnProceso2020.detalle ?? []}
        open={{ tableExpanded: table.getIsAllRowsExpanded(), rowExpanded: row.getIsExpanded() }}
      />
    ),
    filterFn: enProcesoFilterFn,
    sortingFn: (rowA, rowB) => {
      const { cantidad: cantA } = rowA.getValue<{cantidad: number}>('enProceso2020')
      const { cantidad: cantB } = rowB.getValue<{cantidad: number}>('enProceso2020')
      return cantA - cantB
    },
    size: 200
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
            ? <ChevronsDownUp strokeWidth='0.8px' size={15} className='text-muted-foreground' />
            : <ChevronsUpDown strokeWidth='0.8px' size={15} className='text-muted-foreground' />}
          <span className='sr-only'>Toggle</span>
        </Button>
      </div>
    ),
    filterFn: enProcesoFilterFn,
    sortingFn: 'basic',
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
