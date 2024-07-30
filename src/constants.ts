import { ANIO } from './types'

export const ANIOS = [1, 2, 3, 4, 5, 6] as const
export const DIVISIONES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
export const GENEROS = { M: 'Masculino', F: 'Femenino' } as const
export const MOVILIDAD_VALUES = { Adeuda: 'adeuda', 'No adeuda': 'noAdeuda', '-': false } as const

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

export const MATERIAS_POR_CURSO = {
  1: [
    { nombre: 'Lengua y Literatura', es_troncal: true, orientacion: 'Ciclo Básico' },
    { nombre: 'Inglés', es_troncal: false, orientacion: 'Ciclo Básico' },
    { nombre: 'Historia', es_troncal: false, orientacion: 'Ciclo Básico' },
    { nombre: 'Geografía', es_troncal: false, orientacion: 'Ciclo Básico' },
    { nombre: 'Educación Ciudadana', es_troncal: false, orientacion: 'Ciclo Básico' },
    { nombre: 'Educación Física', es_troncal: false, orientacion: 'Ciclo Básico' },
    { nombre: 'Biología', es_troncal: false, orientacion: 'Ciclo Básico' },
    { nombre: 'Educación Artística', es_troncal: false, orientacion: 'Ciclo Básico' },
    { nombre: 'Matemática', es_troncal: true, orientacion: 'Ciclo Básico' },
    { nombre: 'Tecnol. de la Representación', es_troncal: true, orientacion: 'Ciclo Básico' },
    { nombre: 'Taller', es_troncal: true, orientacion: 'Ciclo Básico' }
  ],
  2: [
    { nombre: 'Lengua y Literatura', es_troncal: true, orientacion: 'Ciclo Básico' },
    { nombre: 'Inglés', es_troncal: false, orientacion: 'Ciclo Básico' },
    { nombre: 'Historia', es_troncal: false, orientacion: 'Ciclo Básico' },
    { nombre: 'Geografía', es_troncal: false, orientacion: 'Ciclo Básico' },
    { nombre: 'Educación Ciudadana', es_troncal: false, orientacion: 'Ciclo Básico' },
    { nombre: 'Educación Física', es_troncal: false, orientacion: 'Ciclo Básico' },
    { nombre: 'Biología', es_troncal: false, orientacion: 'Ciclo Básico' },
    { nombre: 'Matemática', es_troncal: true, orientacion: 'Ciclo Básico' },
    { nombre: 'Física', es_troncal: true, orientacion: 'Ciclo Básico' },
    { nombre: 'Tecnol. de la Representación', es_troncal: false, orientacion: 'Ciclo Básico' },
    { nombre: 'Taller', es_troncal: true, orientacion: 'Ciclo Básico' }
  ],
  3: [
    { nombre: 'Historia', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Geografía', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Educación Física', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Educación Ciudadana', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Inglés', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Lengua y Literatura', es_troncal: true, orientacion: 'Ciclo Superior' },
    { nombre: 'Matemática', es_troncal: true, orientacion: 'Ciclo Superior' },
    { nombre: 'Física', es_troncal: true, orientacion: 'Ciclo Superior' },
    { nombre: 'Tecnol. de la Representación', es_troncal: true, orientacion: 'TICs' },
    { nombre: 'Rep. Mediales, Comunicación y Lenguajes', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Química', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Taller de Tecnol. y del Control', es_troncal: true, orientacion: 'Ciclo Superior' },
    { nombre: 'Taller de TICs', es_troncal: true, orientacion: 'TICs' },
    { nombre: 'Taller de Prod. Multimedial', es_troncal: true, orientacion: 'Producción Multimedial' }
  ],
  4: [
    { nombre: 'Educación Física', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Inglés', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Ciudadanía y Trabajo', es_troncal: false, orientacion: 'Producción Multimedial' },
    { nombre: 'Lengua y Literatura', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Ciencia y Tecnología', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Matemática', es_troncal: true, orientacion: 'Ciclo Superior' },
    { nombre: 'Introd. a las Redes de Comunicación', es_troncal: true, orientacion: 'TICs' },
    { nombre: 'Dispositivos Electrónicos Programables', es_troncal: false, orientacion: 'TICs' },
    { nombre: 'Lab. de Soporte de Equipos Informáticos', es_troncal: true, orientacion: 'TICs' },
    { nombre: 'Lab. de Desarrollo de Aplicaciones', es_troncal: true, orientacion: 'TICs' },
    { nombre: 'Taller de Proy. Integradores I', es_troncal: true, orientacion: 'TICs' },
    { nombre: 'Representación Sonora', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Representación Visual', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Diseño Web', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Lab. de Postprod. de la Imagen y del Sonido', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Taller de Tecnol. de la Imagen', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Taller de Tecnol. del Sonido', es_troncal: true, orientacion: 'Producción Multimedial' }
  ],
  5: [
    { nombre: 'Educación Física', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Inglés', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Lengua y Literatura', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Matemática', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Administración de Redes', es_troncal: true, orientacion: 'TICs' },
    { nombre: 'Sist. Integrales de Información', es_troncal: true, orientacion: 'TICs' },
    { nombre: 'Lab. de Soporte de Sist. Informáticos', es_troncal: true, orientacion: 'TICs' },
    { nombre: 'Lab. de Desarrollo de Sist. de Información', es_troncal: true, orientacion: 'TICs' },
    { nombre: 'Taller de Proy. Integradores II', es_troncal: true, orientacion: 'TICs' },
    { nombre: 'Arte, Tecnol. y Comunicación', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Guión y Narrativa', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Lab. de Técnicas de Animación', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Lab. de Proy. Multimediales', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Taller de Proy. Audiovisual de Ficción', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Taller de Proy. Audiovisual Documental', es_troncal: true, orientacion: 'Producción Multimedial' }
  ],
  6: [
    { nombre: 'Educación Física', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Ciudadanía y Trabajo', es_troncal: false, orientacion: 'TICs' },
    { nombre: 'Gestión de los Procesos Productivos', es_troncal: true, orientacion: 'Ciclo Superior' },
    { nombre: 'Economía y Gestión de las Organizaciones', es_troncal: false, orientacion: 'Ciclo Superior' },
    { nombre: 'Admin. Avanzada de Sistemas y Redes', es_troncal: true, orientacion: 'TICs' },
    { nombre: 'Procesamiento de la Información', es_troncal: true, orientacion: 'TICs' },
    { nombre: 'Seguridad y Medioambiente', es_troncal: false, orientacion: 'TICs' },
    { nombre: 'Gestión y Marketing Aplicado a TICs', es_troncal: false, orientacion: 'TICs' },
    { nombre: 'Taller de Proy. Integradores III', es_troncal: true, orientacion: 'TICs' },
    { nombre: 'Arte Digital', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Lab. de Proy. Multimedial Ludificado', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Lab. de Proy. de Tecnol. y Artes Electrónicas', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Taller de Proy. Audio Visual Digital', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Taller de Animación 3D', es_troncal: true, orientacion: 'Producción Multimedial' },
    { nombre: 'Prácticas Profesionalizantes', es_troncal: true, orientacion: 'Ciclo Superior' }
  ]
} as const

export const allSubjects = (() : {[key: string]: string[]} => {
  console.log('allSubjects')
  return Object.fromEntries(Object.keys(MATERIAS_POR_CURSO).map(anio => {
    const subjectsByAnio = MATERIAS_POR_CURSO[Number(anio) as ANIO].map(objSubject => `${objSubject.nombre} (${anio}°)`)
    return [`${anio}° año`, subjectsByAnio]
  }))
})()

export const coursesByYear = (() => {
  console.log('coursesByYear')
  return Object.fromEntries(Object.keys(CURSOS)
    .map(anio => [`${anio}° año`, CURSOS[Number(anio) as keyof(typeof CURSOS)]
      .map(({ nombre }) => nombre)]))
})()
