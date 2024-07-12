import { ANIOS, DIVISIONES, GENEROS, MOVILIDAD_VALUES } from '@/constants'
import { type Student } from '../types'

export function formatData (text: string): Student[] {
  const stringData = text.split('\r\n').map((row) => row.split('\t'))
  const studentsData = stringData
    .slice(1)
    .map(
      ([
        anioValue,
        divisionValue,
        apellidoValue,
        nombreValue,
        dniValue,
        correoValue,
        codigoMiEscuelaValue,
        generoValue,
        fechaNacimientoValue,
        paisNacimientoValue,
        lugarNacimientoValue,
        cudValue,
        adulResp1ApellidoValue,
        adulResp1NombreValue,
        adulResp1DniValue,
        adulResp1TelefonoValue,
        adulResp1CorreoValue,
        adulResp1NacionalidadValue,
        adulResp2ApellidoValue,
        adulResp2NombreValue,
        adulResp2DniValue,
        adulResp2TelefonoValue,
        adulResp2CorreoValue,
        adulResp2NacionalidadValue,
        numLegajoValue,
        anioIngresoValue,
        repitencia1Value,
        repitencia2Value,
        repitencia3Value,
        movilidadValue,
        anioCursado2020Value,
        _materiasPendientesCantTotalValue,
        materiasPendientesCantTroncalesValue,
        detalleTroncalesValue,
        materiasPendientesCantGeneralesValue,
        detalleGeneralesValue,
        materiasEnProceso2020CantidadValue,
        detalleEnProceso2020Value
      ]): Student => {
        return {
          anio: formatValidCourse(ANIOS, anioValue.split('')[0]),
          division: formatValidCourse(DIVISIONES, divisionValue.split('')[0]),
          apellido: apellidoValue.toUpperCase().trim() || undefined,
          nombre: capitalizeWords(nombreValue) || undefined,
          dni: parseInt(dniValue) || undefined,
          correo: correoValue || undefined,
          codigoMiEscuela: codigoMiEscuelaValue || undefined,
          genero: isValidGenderKey(generoValue) ? GENEROS[generoValue] : undefined,
          fechaNacimiento: !isNaN(Date.parse(fechaNacimientoValue)) ? new Date(fechaNacimientoValue) : undefined,
          paisNacimiento: paisNacimientoValue || undefined,
          lugarNacimiento: lugarNacimientoValue || undefined,
          cud: defineCUD(cudValue),
          adulResp1: {
            apellido: adulResp1ApellidoValue || undefined,
            nombre: adulResp1NombreValue || undefined,
            dni: parseInt(adulResp1DniValue) || undefined,
            telefono: parseInt(adulResp1TelefonoValue) || undefined,
            correo: adulResp1CorreoValue || undefined,
            nacionalidad: adulResp1NacionalidadValue || undefined
          },
          adulResp2: {
            apellido: adulResp2ApellidoValue || undefined,
            nombre: adulResp2NombreValue || undefined,
            dni: parseInt(adulResp2DniValue) || undefined,
            telefono: parseInt(adulResp2TelefonoValue) || undefined,
            correo: adulResp2CorreoValue || undefined,
            nacionalidad: adulResp2NacionalidadValue || undefined
          },
          numLegajo: parseInt(numLegajoValue) || undefined,
          anioIngreso: parseInt(anioIngresoValue) || undefined,
          repitencia1: defineRepitencia(repitencia1Value),
          repitencia2: defineRepitencia(repitencia2Value),
          repitencia3: defineRepitencia(repitencia3Value),
          movilidad: isValidMovilidadValue(movilidadValue) ? MOVILIDAD_VALUES[movilidadValue] : undefined,
          anioCursado2020: parseInt(anioCursado2020Value.split('')[0]) || undefined,
          cantTroncales: parseInt(materiasPendientesCantTroncalesValue) >= 0 ? parseInt(materiasPendientesCantTroncalesValue) : undefined,
          detalleTroncales: detalleTroncalesValue ? formatDetalleMateria(detalleTroncalesValue) : [],
          cantGenerales: parseInt(materiasPendientesCantGeneralesValue) >= 0 ? parseInt(materiasPendientesCantGeneralesValue) : undefined,
          detalleGenerales: detalleGeneralesValue ? formatDetalleMateria(detalleGeneralesValue) : [],
          materiasEnProceso2020: {
            cantidad: parseInt(materiasEnProceso2020CantidadValue) >= 0 ? parseInt(materiasEnProceso2020CantidadValue) : undefined,
            detalle: detalleEnProceso2020Value ? formatDetalleMateria(detalleEnProceso2020Value) : []
          }
        }
      }
    )
    // studentsData.forEach((obj) => console.log(obj));
  return studentsData.filter(student => student.dni)
}

const capitalizeWords = (words: string) => words.toLowerCase().trim().split(' ').map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ')

const formatValidCourse = <T>(arrOptions: Readonly<T[]>, numberString: string): T | undefined => {
  const number = Number(numberString) as T
  return arrOptions.includes(number) ? number : undefined
}

const isValidGenderKey = (genderValue: string): genderValue is keyof typeof GENEROS => GENEROS[genderValue as keyof typeof GENEROS] !== undefined

const defineCUD = (cudValue: string): Student['cud'] => {
  if (cudValue === 'TRUE') return true
  if (cudValue === 'FALSE' || !cudValue) return false
}

const defineRepitencia = (repitencia: string): Student['repitencia1'] => {
  if (repitencia === '-') return false
  return formatValidCourse(ANIOS, repitencia.split('')[0])
}

const isValidMovilidadValue = (movilidadValue: string): movilidadValue is keyof typeof MOVILIDAD_VALUES => MOVILIDAD_VALUES[movilidadValue as keyof typeof MOVILIDAD_VALUES] !== undefined

const formatDetalleMateria = (detalle : string) : string[] => {
  const partialString = detalle.slice(0, detalle.length - 1).replaceAll('º', '°')
  if (partialString.includes('Rep. Mediales, Comunicación y Lenguajes') || partialString.includes('Arte, Tecnol. y Comunicación')) {
    return partialString.split('), ').map(string => string.at(-1) === ')' || string === 'No adeuda' ? string : `${string})`)
  }
  return partialString.split(', ')
}
