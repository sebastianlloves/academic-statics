export const ANIOS = [1, 2, 3, 4, 5, 6] as const
export const DIVISIONES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

export const CURSOS = {
  1: [
    { nombre: '1° 1°', division: 1, orientacion: 'Ciclo Básico', turno: 'Mañana' },
    { nombre: '1° 2°', division: 2, orientacion: 'Ciclo Básico', turno: 'Mañana' },
    { nombre: '1° 3°', division: 3, orientacion: 'Ciclo Básico', turno: 'Mañana' },
    { nombre: '1° 4°', division: 4, orientacion: 'Ciclo Básico', turno: 'Tarde' },
    { nombre: '1° 5°', division: 5, orientacion: 'Ciclo Básico', turno: 'Tarde' },
    { nombre: '1° 6°', division: 6, orientacion: 'Ciclo Básico', turno: 'Tarde' }
  ],
  2: [
    { nombre: '2° 1°', division: 1, orientacion: 'Ciclo Básico', turno: 'Mañana' },
    { nombre: '2° 2°', division: 2, orientacion: 'Ciclo Básico', turno: 'Mañana' },
    { nombre: '2° 3°', division: 3, orientacion: 'Ciclo Básico', turno: 'Mañana' },
    { nombre: '2° 4°', division: 4, orientacion: 'Ciclo Básico', turno: 'Tarde' },
    { nombre: '2° 5°', division: 5, orientacion: 'Ciclo Básico', turno: 'Tarde' },
    { nombre: '2° 6°', division: 6, orientacion: 'Ciclo Básico', turno: 'Tarde' }
  ],
  3: [
    { nombre: '3° 1°', division: 1, orientacion: 'Producción Multimedial', turno: 'Mañana' },
    { nombre: '3° 2°', division: 2, orientacion: 'TICs', turno: 'Mañana' },
    { nombre: '3° 3°', division: 3, orientacion: 'TICs', turno: 'Mañana' },
    { nombre: '3° 4°', division: 4, orientacion: 'Producción Multimedial', turno: 'Tarde' },
    { nombre: '3° 5°', division: 5, orientacion: 'Producción Multimedial', turno: 'Tarde' },
    { nombre: '3° 6°', division: 6, orientacion: 'TICs', turno: 'Tarde' }
  ],
  4: [
    { nombre: '4° 1°', division: 1, orientacion: 'Producción Multimedial', turno: 'Mañana' },
    { nombre: '4° 2°', division: 2, orientacion: 'TICs', turno: 'Mañana' },
    { nombre: '4° 3°', division: 3, orientacion: 'Producción Multimedial', turno: 'Tarde' },
    { nombre: '4° 4°', division: 4, orientacion: 'TICs', turno: 'Tarde' }
  ],
  5: [
    { nombre: '5° 1°', division: 1, orientacion: 'Producción Multimedial', turno: 'Mañana' },
    { nombre: '5° 2°', division: 2, orientacion: 'TICs', turno: 'Mañana' },
    { nombre: '5° 3°', division: 3, orientacion: 'Producción Multimedial', turno: 'Tarde' },
    { nombre: '5° 4°', division: 4, orientacion: 'TICs', turno: 'Tarde' }
  ],
  6: [
    { nombre: '6° 1°', division: 1, orientacion: 'Producción Multimedial', turno: 'Mañana' },
    { nombre: '6° 2°', division: 2, orientacion: 'TICs', turno: 'Mañana' }
  ]
} as const

export type ANOS = keyof(typeof CURSOS)
export type DIV = typeof CURSOS[ANOS][number]['division']
export type CURSO = typeof CURSOS[ANOS][number]['nombre']
export type ORIENTACIONES = typeof CURSOS[ANOS][number]['orientacion']
export type TURNOS = typeof CURSOS[ANOS][number]['turno']
export const GENEROS = { M: 'Masculino', F: 'Femenino' } as const
export const MOVILIDAD_VALUES = { Adeuda: 'adeuda', 'No adeuda': 'noAdeuda', '-': false } as const

export const LOADING_DATA = Array.from({ length: 25 }, () => {
  return {
    anio: 'loading',
    division: 'loading',
    apellido: 'loading',
    nombre: 'loading',
    dni: 'loading',
    correo: 'loading',
    codigoMiEscuela: 'loading',
    genero: 'loading',
    fechaNacimiento: 'loading',
    paisNacimiento: 'loading',
    lugarNacimiento: 'loading',
    cud: 'loading',
    adulResp1: {
      nombre: 'loading',
      dni: 'loading',
      telefono: 'loading',
      correo: 'loading',
      nacionalidad: 'loading'
    },
    adulResp2: {
      apellido: 'loading',
      nombre: 'loading',
      dni: 'loading',
      telefono: 'loading',
      correo: 'loading',
      nacionalidad: 'loading'
    },
    numLegajo: 'loading',
    anioIngreso: 'loading',
    repitencia1: 'loading',
    repitencia2: 'loading',
    repitencia3: 'loading',
    movilidad: 'loading',
    anioCursado2020: 'loading',
    materiasPendientes: {
      cantTotal: 'loading',
      cantTroncales: 'loading',
      detalleTroncales: 'loading',
      cantGenerales: 'loading',
      detalleGenerales: 'loading'
    },
    materiasEnProceso2020: {
      cantidad: 'loading',
      detalle: 'loading'
    }
  }
})
