import { ANIOS, DIVISIONES } from "./utils/formatData";

export type Student = {
  anio?: (typeof ANIOS)[number];
  division?: (typeof DIVISIONES)[number];
  apellido: string;
  nombre: string;
  dni: number;
  correo?: string;
  codigoMiEscuela?: string;
  genero?: "Masculino" | "Femenino";
  fechaNacimiento?: Date;
  paisNacimiento?: string;
  lugarNacimiento?: string;
  cud?: boolean;
  adulResp1: AdulResp;
  adulResp2: AdulResp;
  numLegajo?: number;
  anioIngreso: number;
  repitencia1?: Student["anio"] | false;
  repitencia2?: Student["anio"] | false;
  repitencia3?: Student["anio"] | false;
  movilidad?: "Adeuda" | "No adeuda" | false;
  anioCursado2020: number;
  materiasPendientes: MateriasPendientes;
  materiasEnProceso2020: MateriasEnProceso2020;
};

type AdulResp = {
  apellido?: string;
  nombre?: string;
  dni?: number,
  telefono?: number;
  correo?: string;
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

