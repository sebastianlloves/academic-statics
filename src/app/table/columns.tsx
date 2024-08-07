import { ColumnDef, Row, RowData } from '@tanstack/react-table'
import { type Student } from '@/types'
import { Badge } from '@/components/ui/badge'
import { CURSO } from '@/types'
import SortingHeader from './sortingHeader'
import SubRow from './subRow'
import { BadgeCheck, ChevronsDownUp, ChevronsUpDown, CircleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MateriasFilterState } from './filters/filterInputs/materias/materiasFilter'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
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
    cell: ({ row }) => {
      const hasSubjects = (row.original.cantTroncales || 0) + (row.original.cantGenerales || 0) + (row.original.materiasEnProceso2020.cantidad || 0) > 0
      return (
        <div className='h-10 w-6 flex justify-center items-center'>
          <Button
            variant='ghost'
            className='w-full h-8 px-0'
            onClick={() => row.toggleExpanded()}
            disabled={!hasSubjects}
          >
            {row.getIsExpanded() && hasSubjects
              ? <ChevronsDownUp strokeWidth='0.9px' size={15} className='text-foreground/80' />
              : <ChevronsUpDown strokeWidth='0.9px' size={15} className='text-foreground/80' />}
            <span className='sr-only'>Toggle</span>
          </Button>
        </div>
      )
    },
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
    size: 60,
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
        <Badge variant='outline' className='text-nowrap'>{cell.getValue() as string}</Badge>
      </div>
    ),
    size: 100,
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
    accessorFn: (row) => `${row.apellido}, ${row.nombre}`,
    header: ({ column }) => (
      <SortingHeader title='Estudiante' column={column} />
    ),
    cell: ({ table, row }) => {
      const { apellido, nombre } = row.original
      const capitalizeApellido = apellido?.split(' ').map(word => word[0]?.toUpperCase() + word.substring(1).toLowerCase()).join(' ')
      const capitalizeNombre = nombre?.split(' ').map(word => word[0]?.toUpperCase() + word.substring(1).toLowerCase()).join(' ')
      return (
        <div className='h-full self-stretch flex flex-col'>
          <div className='text-left self-stretch h-full text-nowrap'>
            <p className='font-medium'>{capitalizeApellido}</p>
            <p className='font-normal text-muted-foreground'>{capitalizeNombre}</p>
          </div>
          {
            (table.getIsAllRowsExpanded() || row.getIsExpanded()) && <div className='h-full self-stretch' />
          }
        </div>
      )
    },
    sortingFn: 'text',
    size: 180,
    filterFn: 'includesString',
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
      <div className='h-10 flex justify-end items-center px-0 mx-0'>
        <p className='text-xs  text-muted-foreground px-0 mx-0'>{row.original.dni}</p>
      </div>),
    size: 90,
    filterFn: 'includesString',
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
    size: 190,
    meta: {
      title: 'Troncales'
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
    size: 190,
    meta: {
      title: 'Generales'
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
    size: 190,
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
          {value === 'faltan datos'
            ? <p className='capitalize text-muted'>{value}</p>
            : (
              <Badge
                variant={value === 'promociona' ? 'success' : 'destructive'}
                className='capitalize px-3 flex justify-center items-center gap-x-2 rounded-full'
              >
                {value === 'promociona' ? <BadgeCheck size={16} strokeWidth='1.5px' /> : <CircleAlert size={16} strokeWidth='1.5px' className='text-destructive-foreground' />}
                {value}
              </Badge>
              )}
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
