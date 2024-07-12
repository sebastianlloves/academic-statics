import { ANIOS, CURSOS, DIVISIONES, GENEROS, MATERIAS_POR_CURSO, MOVILIDAD_VALUES } from './constants'

export type ANIO = keyof(typeof CURSOS)
export type DIVISION = typeof CURSOS[ANIO][number]['division']
export type CURSO = typeof CURSOS[ANIO][number]['nombre']
export type ORIENTACIONES = typeof CURSOS[ANIO][number]['orientacion']
export type TURNOS = typeof CURSOS[ANIO][number]['turno']
export type MATERIA = `${typeof MATERIAS_POR_CURSO[ANIO][number]['nombre']} (${ANIO}°)`

type AdulResp = {
  apellido?: string;
  nombre?: string;
  dni?: number,
  telefono?: number;
  correo?: string;
  nacionalidad?: string;
};

type MateriasEnProceso2020 = {
  cantidad?: number;
  detalle?: string[];
};

export type Student = {
  anio?: (typeof ANIOS)[number];
  division?: (typeof DIVISIONES)[number];
  apellido?: string;
  nombre?: string;
  dni?: number;
  correo?: string;
  codigoMiEscuela?: string;
  genero?: typeof GENEROS[keyof typeof GENEROS];
  fechaNacimiento?: Date;
  paisNacimiento?: string;
  lugarNacimiento?: string;
  cud?: boolean;
  adulResp1: AdulResp;
  adulResp2: AdulResp;
  numLegajo?: number;
  anioIngreso?: number;
  repitencia1?: Student['anio'] | false;
  repitencia2?: Student['anio'] | false;
  repitencia3?: Student['anio'] | false;
  movilidad?: typeof MOVILIDAD_VALUES[keyof typeof MOVILIDAD_VALUES];
  anioCursado2020?: number;
  cantTroncales?: number;
  detalleTroncales?: string[];
  cantGenerales?: number;
  detalleGenerales?: string[];
  materiasEnProceso2020: MateriasEnProceso2020;
};
