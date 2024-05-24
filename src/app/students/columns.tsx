import { ColumnDef } from "@tanstack/react-table";
import { type Student } from "@/types";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "anio",
    header: () => <div className='text-center font-bold my-4'>Año</div>,
    cell: ({row}) => {
        return <div className='text-center'>{`${row.getValue("anio")}°`}</div>;
    },
  },
  {
    accessorKey: "division",
    header: () => <div className='text-center font-bold my-4'>División</div>,
    cell: ({row}) => {
        return <div className='text-center'>{`${row.getValue("division")}°`}</div>;
    }
  },
  {
    accessorKey: "apellido",
    header: () => <div className='text-center font-bold my-4'>Apellido</div>,
    cell: ({row}) => {
        return <div className='text-center'>{row.getValue("apellido")}</div>;
    },
    size:1000,
  },
  {
    accessorKey: "nombre",
    header: () => <div className='text-center font-bold my-4'>Nombre</div>,
    cell: ({row}) => {
        return <div className='text-center'>{row.getValue("nombre")}</div>;
    }
  },
  {
    accessorKey: "dni",
    header: () => <div className='text-center font-bold my-4'>DNI</div>,
    cell: ({row}) => {
        return <div className='text-center'>{row.getValue("dni")}</div>;
    }
  },
];