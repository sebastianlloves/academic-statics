import { MOVILIDAD_VALUES } from '@/constants'
import { type Student } from '../types'

export function formatData (text: string): Student[] {
  const [, ...data] = text.split('\r\n').map((row) => row.split('\t'))
  const studentsData = data
    .slice(1)
    .map(
      ([
        anioValue,
        divisionValue,
        apellidoValue,
        nombreValue,
        dniValue,
        materiasPendientesCantTroncalesValue,
        detalleTroncalesValue,
        materiasPendientesCantGeneralesValue,
        detalleGeneralesValue,
        materiasEnProceso2020CantidadValue,
        detalleEnProceso2020Value,
        repitencia1Value,
        repitencia2Value,
        repitencia3Value,
        movilidadValue
      ]): Student => {
        return {
          anio: parseInt(anioValue.split('')[0]) || undefined,
          division: parseInt(divisionValue.split('')[0]),
          apellido: capitalizeWords(apellidoValue).trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '') || undefined,
          nombre: capitalizeWords(nombreValue).normalize('NFD').replace(/[\u0300-\u036f]/g, '') || undefined,
          dni: parseInt(dniValue) || undefined,
          repitencia: defineRepitencia([repitencia1Value, repitencia2Value, repitencia3Value]),
          movilidad: /* isValidMovilidadValue(movilidadValue) ? MOVILIDAD_VALUES[movilidadValue] : */ undefined,
          cantTroncales: parseInt(materiasPendientesCantTroncalesValue) >= 0 ? parseInt(materiasPendientesCantTroncalesValue) : undefined,
          detalleTroncales: detalleTroncalesValue ? formatDetalleMateria(detalleTroncalesValue) : [],
          cantGenerales: parseInt(materiasPendientesCantGeneralesValue) >= 0 ? parseInt(materiasPendientesCantGeneralesValue) : undefined,
          detalleGenerales: detalleGeneralesValue ? formatDetalleMateria(detalleGeneralesValue) : [],
          cantEnProceso2020: parseInt(materiasEnProceso2020CantidadValue) >= 0 ? parseInt(materiasEnProceso2020CantidadValue) : undefined,
          detalleEnProceso2020: detalleEnProceso2020Value ? formatDetalleMateria(detalleEnProceso2020Value) : []
        }
      }
    )
  // studentsData.forEach((obj) => console.log('repitencia', obj.dni, obj.repitencia))
  return studentsData.filter(student => student.dni)
}

const capitalizeWords = (words: string) => words.toLowerCase().trim().split(' ').map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ')

const defineRepitencia = (repitenciaArr: string[]): Student['repitencia'] => repitenciaArr.map(value => parseInt(value.split('')[0]) || undefined).filter(value => value !== undefined)?.sort()

// const isValidMovilidadValue = (movilidadValue: string): movilidadValue is keyof typeof MOVILIDAD_VALUES => MOVILIDAD_VALUES[movilidadValue as keyof typeof MOVILIDAD_VALUES] !== undefined

const formatDetalleMateria = (detalle : string) : string[] => {
  const partialString = detalle.slice(0, detalle.length - 1).replaceAll('º', '°')
  if (partialString.includes('Rep. Mediales, Comunicación y Lenguajes') || partialString.includes('Arte, Tecnol. y Comunicación')) {
    return partialString.split('), ').map(string => string.at(-1) === ')' || string === 'No adeuda' ? string : `${string})`)
  }
  return partialString.split(', ')
}
