export type Student = {
  ano: (typeof YEARS)[number];
  division: number;
  apellido: string;
  nombre: string;
  dni: number;
  correo?: `${string}@${string}.${string}`;
  codigoMiEscuela?: string;
  genero?: "Masculino" | "Femenino";
  fechaNacimiento?: Date;
  paisNacimiento?: string;
  lugarNacimiento?: string;
  cud?: boolean;
  adulResp1?: AdulResp;
  adulResp2?: AdulResp;
  numLegajo?: number;
  anoIngreso: number;
  repitencia2?: Student["ano"] | false;
  repitencia3?: Student["ano"] | false;
  repitencia1?: Student["ano"] | false;
  movilidad: "Adeuda" | "No adeuda" | false;
  anoCursado2020: number;
  materiasPendientes: MateriasPendientes;
  materiasEnProceso2020: MateriasEnProceso2020;
};

type AdulResp = {
  apellido?: string;
  nombre?: string;
  telefono?: number;
  correo?: `${string}@${string}.${string}`;
  nacionalidad?: string;
};

type MateriasEnProceso2020 = {
  cantidad: number;
  detalle: string;
};

type MateriasPendientes = {
  cantTotal: number;
  cantTroncales: number;
  detalleTroncales: string;
  cantGenerales: number;
  detalleGenerales: string;
};

const YEARS = [1, 2, 3, 4, 5, 6, false] as const;

export function formatValidYear(numberString: string): Student["ano"] {
  const number = Number(numberString) as Student["ano"];
  return YEARS.includes(number) && number
}
