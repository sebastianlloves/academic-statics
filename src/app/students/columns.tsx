import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { type Student } from "@/types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Student>[] = [/* 
  {
    id: "curso",
    header: () => <div className='text-center font-bold'>Curso</div>,
    accessorFn: (row) => `${row.anio}° ${row.division}°`,
  }, */
  {
    id: "estudiante",
    header: () => (
      <div className='text-center font-bold max-w-xs'>Estudiante</div>
    ),
    cell: ({ row: { original } }) => {
      return (
        <div className='flex gap-x-5 items-center min-w-fit'>
          <Badge variant={"outline"} className='min-w-fit'>
            {`${original.anio}° ${original.division}°`}
          </Badge>
          <p className='text-left min-w-fit'>
            {`${original.apellido}, ${original.nombre}`}
          </p>
        </div>
      );
    },
    size: 10,
  },
  {
    accessorKey: "dni",
    header: () => <div className='text-center font-bold'>DNI</div>,
    cell: ({ row }) => {
      return <div className='text-right'>{row.original.dni}</div>;
    },
  },
];
