import { ANIOS, CURSOS, DIVISIONES, MATERIAS_POR_CURSO, MOVILIDAD_VALUES } from './constants'

export type ANIO = keyof(typeof CURSOS)
export type DIVISION = typeof CURSOS[ANIO][number]['division']
export type CURSO = typeof CURSOS[ANIO][number]['nombre']
export type ORIENTACIONES = typeof CURSOS[ANIO][number]['orientacion']
export type TURNOS = typeof CURSOS[ANIO][number]['turno']
export type MATERIA = `${typeof MATERIAS_POR_CURSO[ANIO][number]['nombre']} (${ANIO}°)`

export type Student = {
  anio?: number;
  division?: number;
  apellido?: string;
  nombre?: string;
  dni?: number;
  repitencia?: number[];
  movilidad?: typeof MOVILIDAD_VALUES[keyof typeof MOVILIDAD_VALUES];
  cantTroncales?: number;
  detalleTroncales?: string[];
  cantGenerales?: number;
  detalleGenerales?: string[];
  cantEnProceso2020?: number;
  detalleEnProceso2020?: string[];
};
