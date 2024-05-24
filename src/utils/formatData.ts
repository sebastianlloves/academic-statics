import { type Student } from "../types";

export const ANIOS = [1, 2, 3, 4, 5, 6] as const;
export const DIVISIONES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export const GENEROS = ["Masculino", "Femenino"] as const;
export const MOVILIDAD_VALUES = ["Adeuda", "No adeuda", false] as const;

export function formatData(text: string): Student[] {
  const stringData = text.split("\r\n").map((row) => row.split("\t"));
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
        adulResp1_apellidoValue,
        adulResp1_nombreValue,
        adulResp1_dniValue,
        adulResp1_telefonoValue,
        adulResp1_correoValue,
        adulResp1_nacionalidadValue,
        adulResp2_apellidoValue,
        adulResp2_nombreValue,
        adulResp2_dniValue,
        adulResp2_telefonoValue,
        adulResp2_correoValue,
        adulResp2_nacionalidadValue,
        numLegajoValue,
        anioIngresoValue,
        repitencia1Value,
        repitencia2Value,
        repitencia3Value,
        movilidadValue,
        anioCursado2020Value,
        materiasPendientes_cantTotalValue,
        materiasPendientes_cantTroncalesValue,
        materiasPendientes_detalleTroncalesValue,
        materiasPendientes_cantGeneralesValue,
        materiasPendientes_detalleGeneralesValue,
        materiasEnProceso2020_cantidadValue,
        materiasEnProceso2020_detalleValue,
      ]): Student => {
        return {
          anio: formatValidCourse(ANIOS, anioValue.split("")[0]),
          division: formatValidCourse(DIVISIONES, divisionValue.split("")[0]),
          apellido: apellidoValue.toUpperCase().trim() || undefined,
          nombre: capitalizeWords(nombreValue) || undefined,
          dni: parseInt(dniValue) || undefined,
          correo: correoValue || undefined,
          codigoMiEscuela: codigoMiEscuelaValue || undefined,
          genero: defineGender(generoValue),
          fechaNacimiento: !isNaN(Date.parse(fechaNacimientoValue))
            ? new Date(fechaNacimientoValue)
            : undefined,
          paisNacimiento: paisNacimientoValue || undefined,
          lugarNacimiento: lugarNacimientoValue || undefined,
          cud: defineCUD(cudValue),
          adulResp1: {
            apellido: adulResp1_apellidoValue || undefined,
            nombre: adulResp1_nombreValue || undefined,
            dni: parseInt(adulResp1_dniValue) || undefined,
            telefono: parseInt(adulResp1_telefonoValue) || undefined,
            correo: adulResp1_correoValue || undefined,
            nacionalidad: adulResp1_nacionalidadValue || undefined,
          },
          adulResp2: {
            apellido: adulResp2_apellidoValue || undefined,
            nombre: adulResp2_nombreValue || undefined,
            dni: parseInt(adulResp2_dniValue) || undefined,
            telefono: parseInt(adulResp2_telefonoValue) || undefined,
            correo: adulResp2_correoValue || undefined,
            nacionalidad: adulResp2_nacionalidadValue || undefined,
          },
          numLegajo: parseInt(numLegajoValue) || undefined,
          anioIngreso: parseInt(anioIngresoValue) || undefined,
          repitencia1: defineRepitencia(repitencia1Value),
          repitencia2: defineRepitencia(repitencia2Value),
          repitencia3: defineRepitencia(repitencia3Value),
          movilidad: defineMovilidad(movilidadValue),
          anioCursado2020:
            parseInt(anioCursado2020Value.split("")[0]) || undefined,
          materiasPendientes: {
            cantTotal:
              parseInt(materiasPendientes_cantTotalValue) >= 0
                ? parseInt(materiasPendientes_cantTotalValue)
                : undefined,
            cantTroncales:
              parseInt(materiasPendientes_cantTroncalesValue) >= 0
                ? parseInt(materiasPendientes_cantTroncalesValue)
                : undefined,
            detalleTroncales: materiasPendientes_detalleTroncalesValue,
            cantGenerales:
              parseInt(materiasPendientes_cantGeneralesValue) >= 0
                ? parseInt(materiasPendientes_cantGeneralesValue)
                : undefined,
            detalleGenerales: materiasPendientes_detalleGeneralesValue,
          },
          materiasEnProceso2020: {
            cantidad:
              parseInt(materiasEnProceso2020_cantidadValue) >= 0
                ? parseInt(materiasEnProceso2020_cantidadValue)
                : undefined,
            detalle: materiasEnProceso2020_detalleValue,
          },
        };
      }
    );
  // studentsData.forEach((obj) => console.log(obj));
  return studentsData.filter((student) => student.dni);
}

const capitalizeWords = (words: string) =>
  words
    .toLowerCase()
    .trim()
    .split(" ")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");

const formatValidCourse = <T>(
  arrOptions: Readonly<T[]>,
  numberString: string
): T | undefined => {
  const number = Number(numberString) as T;
  return arrOptions.includes(number) ? number : undefined;
};

const defineGender = (genderValue: string): Student["genero"] => {
  if (genderValue === "M") return "Masculino";
  if (genderValue === "F") return "Femenino";
  return;
};

const defineCUD = (cudValue: string): Student["cud"] => {
  if (cudValue === "TRUE") return true;
  if (cudValue === "FALSE" || !cudValue) return false;
};

const defineRepitencia = (repitencia: string): Student["repitencia1"] => {
  if (repitencia === "-") return false;
  return formatValidCourse(ANIOS, repitencia.split("")[0]);
};

const defineMovilidad = (movilidad: string): Student["movilidad"] => {
  if (movilidad === "-") return false;
  if (movilidad === "Adeuda" || movilidad === "No adeuda") return movilidad;
  return;
};

/* ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
["","","Año","Div","APELLIDO","NOMBRE","DNI","Correo Alumno/a","Código miEscuela","Género","Fecha de Nacimiento","País de Nacimiento","Lugar de Nacimiento","CUD","Adulto Responsable 1","","","","","","Adulto Responsable 2","","","","","","Nº de Legajo","Año de Ingreso","Repitencia","","","Movilidad","Año cursado en 2020","Materias PENDIENTES","","","","","Materias EN PROCESO (2020)","","1º año","","","","","","","","","","","2º año","","","","","","","","","","","3º año","","","","","","","","","","","","","","4º año","","","","","","","","","","","","","","","","","5º año","","","","","","","","","","","","","","","6º año","","","","","","","","","","","","","",""],
["","0","","","","","","","","","","","","","APELLIDO","Nombre","DNI","Teléfono","Correo","Nacionalidad","APELLIDO","Nombre","DNI","Teléfono","Correo","Nacionalidad","","","","","","","","#NAME?","","","","","","","Lengua y Literatura","Inglés","Historia","Geografía","Educación Ciudadana","Educación Física","Biología","Educación Artística","Matemática","Tecnol. de la Representación","Taller","Lengua y Literatura","Inglés","Historia","Geografía","Educación Ciudadana","Educación Física","Biología","Matemática","Física","Tecnol. de la Representación","Taller","Historia","Geografía","Educación Física","Educación Ciudadana","Inglés","Lengua y Literatura","Matemática","Física","Tecnol. de la Representación","Rep. Mediales, Comunicación y Lenguajes","Química","Taller de Tecnol. y del Control","Taller de TICs","Taller de Prod. Multimedial","Educación Física","Inglés","Ciudadanía y Trabajo","Lengua y Literatura","Ciencia y Tecnología","Matemática","Introd. a las Redes de Comunicación","Dispositivos Electrónicos Programables","Lab. de Soporte de Equipos Informáticos","Lab. de Desarrollo de Aplicaciones","Taller de Proy. Integradores I","Representación Sonora","Representación Visual","Diseño Web","Lab. de Postprod. de la Imagen y del Sonido","Taller de Tecnol. de la Imagen","Taller de Tecnol. del Sonido","Educación Física","Inglés","Lengua y Literatura","Matemática","Administración de Redes","Sist. Integrales de Información","Lab. de Soporte de Sist. Informáticos","Lab. de Desarrollo de Sist. de Información","Taller de Proy. Integradores II","Arte, Tecnol. y Comunicación","Guión y Narrativa","Lab. de Técnicas de Animación","Lab. de Proy. Multimediales","Taller de Proy. Audiovisual de Ficción","Taller de Proy. Audiovisual Documental","Educación Física","Ciudadanía y Trabajo","Gestión de los Procesos Productivos","Economía y Gestión de las Organizaciones","Admin. Avanzada de Sistemas y Redes","Procesamiento de la Información","Seguridad y Medioambiente","Gestión y Marketing Aplicado a TICs","Taller de Proy. Integradores III","Arte Digital","Lab. de Proy. Multimedial Ludificado","Lab. de Proy. de Tecnol. y Artes Electrónicas","Taller de Proy. Audio Visual Digital","Taller de Animación 3D","Prácticas Profesionalizantes"] */
