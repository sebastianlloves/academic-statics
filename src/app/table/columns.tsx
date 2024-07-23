import { ColumnDef, Row } from '@tanstack/react-table'
import { type Student } from '@/types'
import { Badge } from '@/components/ui/badge'
import { CURSO } from '@/types'
import SortingHeader from './sortingHeader'
import SubRow from './subRow'
import { ChevronsDownUp, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MateriasFilterState } from './filters/filterInputs/materiasFilter'

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    title?: string,
    align?: 'right'
  }
}

export const columns: ColumnDef<Student>[] = [
  {
    id: 'expand',
    accessorFn: (row) => {
      const detalleTroncales = row.detalleTroncales || []
      const detalleGenerales = row.detalleGenerales || []
      const studentSubjects = [...detalleTroncales, ...detalleGenerales].filter(subject => subject !== 'No adeuda')
      return studentSubjects
    },
    header: ({ table }) => (
      <div className='h-10 w-6 flex justify-center items-center -mt-0.5'>
        <Button
          variant='ghost' className='h-8 w-full px-0' onClick={() => table.toggleAllRowsExpanded(!table.getIsSomeRowsExpanded())}
        >
          {table.getIsSomeRowsExpanded()
            ? <ChevronsDownUp strokeWidth='1.2px' size={15} className='text-foreground' />
            : <ChevronsUpDown strokeWidth='1.2px' size={15} className='text-foreground' />}
          <span className='sr-only'>Toggle</span>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className='h-10 w-6 flex justify-center items-center'>
        <Button variant='ghost' className='w-full h-8 px-0' onClick={() => row.toggleExpanded()}>
          {row.getIsExpanded()
            ? <ChevronsDownUp strokeWidth='0.9px' size={15} className='text-foreground/80' />
            : <ChevronsUpDown strokeWidth='0.9px' size={15} className='text-foreground/80' />}
          <span className='sr-only'>Toggle</span>
        </Button>
      </div>
    ),
    filterFn: (row: Row<Student>, _columnID, filterValue: MateriasFilterState) => {
      const { subjects, includeEnProceso2020, strictInclusion } = filterValue
      if (subjects.length === 0) return true
      const detalleTroncales = row.original.detalleTroncales || []
      const detalleGenerales = row.original.detalleGenerales || []
      const detalleEnProceso2020 = (includeEnProceso2020 && row.original.materiasEnProceso2020.detalle) || []
      const studentSubjects = [...detalleTroncales, ...detalleGenerales, ...detalleEnProceso2020]
      return strictInclusion ? subjects.every(subject => studentSubjects.includes(subject)) : subjects.some(subject => studentSubjects.includes(subject))
    },
    enableSorting: false,
    size: 30,
    meta: {
      title: 'expandir'
    }
  },
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
    size: 70,
    filterFn: (row: Row<Student>, columnID: string, filterValue: CURSO[]) => {
      if (filterValue.length === 0) return true
      return filterValue.includes(row.getValue(columnID))
    },
    sortingFn: 'alphanumeric',
    enableHiding: false,
    sortDescFirst: true,
    meta: {
      title: 'Curso'
    },
    footer: (props) => {
      console.log(props)
      return props.column.id
    }
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
        <div className='text-left h-10 text-nowrap'>
          <p className='font-medium'>{capitalizeApellido}</p>
          <p className='font-normal text-muted-foreground'>{capitalizeNombre}</p>
        </div>
      )
    },
    sortingFn: 'text',
    size: 180,
    enableHiding: false,
    sortDescFirst: true,
    meta: {
      title: 'estudiante'
    }
  },
  {
    id: 'dni',
    accessorKey: 'dni',
    header: ({ column }) => (
      <SortingHeader title='DNI' column={column} />
    ),
    cell: ({ row }) => (
      <div className='h-10 flex flex-col justify-center'>
        <p className='text-xs text-muted-foreground'>{row.original.dni}</p>
      </div>),
    size: 77,
    sortingFn: 'basic',
    meta: {
      title: 'DNI',
      align: 'right'
    }
  },
  {
    id: 'troncales',
    accessorFn: (row) => row.cantTroncales,
    header: ({ column }) => (
      <div className='flex gap-x-2 items-center'>
        <SortingHeader title='Troncales' column={column} className='' />
      </div>
    ),
    cell: ({ table, row }) => (
      <SubRow
        triggerContent={row.original.cantTroncales ?? 0}
        subjects={row.original.detalleTroncales ?? []}
        open={table.getIsAllRowsExpanded() || row.getIsExpanded()}
      />
    ),
    filterFn: 'inNumberRange',
    sortingFn: 'basic',
    size: 220,
    meta: {
      title: 'troncales'
    }
  },
  {
    id: 'generales',
    accessorFn: (row) => row.cantGenerales,
    header: ({ column }) => (
      <SortingHeader title='Generales' column={column} />
    ),
    cell: ({ table, row }) => (
      <SubRow
        triggerContent={row.original.cantGenerales ?? 0}
        subjects={row.original.detalleGenerales ?? []}
        open={table.getIsAllRowsExpanded() || row.getIsExpanded()}
      />
    ),
    filterFn: 'inNumberRange',
    sortingFn: 'basic',
    size: 220,
    meta: {
      title: 'generales'
    }
  },
  {
    id: 'enProceso2020',
    accessorKey: 'materiasEnProceso2020.cantidad',
    header: ({ column }) => (
      <SortingHeader title='En Proceso (2020)' column={column} />
    ),
    cell: ({ table, row }) => (
      <SubRow
        triggerContent={row.original.materiasEnProceso2020.cantidad ?? 0}
        subjects={row.original.materiasEnProceso2020.detalle ?? []}
        open={table.getIsAllRowsExpanded() || row.getIsExpanded()}
      />
    ),
    filterFn: 'inNumberRange',
    sortingFn: 'basic',
    sortDescFirst: true,
    size: 220,
    meta: {
      title: 'En Proceso (2020)'
    }
  },
  {
    id: 'promocion',
    accessorFn: (row) => {
      const { cantTroncales, cantGenerales } = row
      if (cantTroncales === undefined || cantGenerales === undefined) return 'faltan datos'
      return cantTroncales <= 2 && cantTroncales + cantGenerales <= 4 ? 'promociona' : 'permanece'
    },
    header: ({ column }) => (
      <SortingHeader title='Promoción' column={column} />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<string>()
      return (
        <div className='h-10 flex flex-col items-start justify-center'>
          {value === 'faltan datos' && <Badge variant='outline' className='capitalize'>{value}</Badge>}
          {value === 'promociona' ? <Badge variant='success' className='capitalize'>{value}</Badge> : <Badge variant='destructive' className='capitalize'>{value}</Badge>}
        </div>
      )
    },
    filterFn: 'includesString',
    sortingFn: 'text',
    size: 150,
    meta: {
      title: 'promoción'
    }
  }
]

/* function pendientesFilterFn (row: Row<Student>, _columnID: string, filterValue: materiasFilterValueState) {
  const { cantTroncales, cantGenerales } = row.original
  if (cantTroncales === undefined || cantGenerales === undefined) return false
  const isInTroncalesRange = cantTroncales >= filterValue.troncalesRange[0] && cantTroncales <= filterValue.troncalesRange[1]
  const isInGeneralesRange = cantGenerales >= filterValue.generalesRange[0] && cantGenerales <= filterValue.generalesRange[1]
  const isValidPromotedCondition = filterValue.promotedAndRepetears === 'onlyPromoted'
    ? cantTroncales <= 2 && cantTroncales + cantGenerales <= 4
    : filterValue.promotedAndRepetears === 'onlyRepeaters'
      ? cantTroncales > 2 || cantTroncales + cantGenerales > 4
      : true

  return isInTroncalesRange && isInGeneralesRange && isValidPromotedCondition
} */

/* function enProcesoFilterFn (row: Row<Student>, _columnID: string, filterValue: materiasFilterValueState) {
  const { cantidad } = row.original.materiasEnProceso2020
  if (cantidad === undefined) return false
  const [min, max] = filterValue.enProceso2020Range
  return cantidad >= min && cantidad <= max
} */
