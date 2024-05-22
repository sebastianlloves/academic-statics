import { type Student, formatValidYear } from "../types";

export function formatData(text: string): Student[] {
  console.log(text);
  const stringData = text.split("\r\n").map((row) => row.split("\t"));
  const header = stringData[0];
  const studentsData = stringData
    .slice(1)
    .map(
      ([
        anoValue,
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
        anoIngresoValue,
        repitencia1Value,
        repitencia2Value,
        repitencia3Value,
        movilidadValue,
        anoCursado2020Value,
        materiasPendientes_cantTotalValue,
        materiasPendientes_cantTroncalesValue,
        materiasPendientes_detalleTroncalesValue,
        materiasPendientes_cantGeneralesValue,
        materiasPendientes_detalleGeneralesValue,
        materiasEnProceso2020_cantidadValue,
        materiasEnProceso2020_detalleValue,
      ]): Student => {
        return {
          ano: formatValidYear(anoValue.split("")[0]),
          division: Number(divisionValue.split("")[0]),
          apellido: apellidoValue.toUpperCase().trim(),
          nombre: capitalizeWords(nombreValue),
          dni: Number(dniValue),
          correo: correoValue,
          codigoMiEscuela: undefined,
          genero: undefined,
          fechaNacimiento: undefined,
          paisNacimiento: undefined,
          lugarNacimiento: undefined,
          cud: undefined,
          adulResp1: undefined,
          adulResp2: undefined,
          numLegajo: undefined,
          anoIngreso: undefined,
          repitencia2: undefined,
          repitencia3: undefined,
          repitencia1: undefined,
          movilidad: undefined,
          anoCursado2020: undefined,
          materiasPendientes: undefined,
          materiasEnProceso2020: undefined,
        };
      }
    );
  studentsData.forEach((obj) => console.log(obj));
  return studentsData.filter(
    (student) => student.dni !== undefined && student.apellido !== undefined
  );
}

function capitalizeWords(words: string) {
  return words
    .toLowerCase()
    .trim()
    .split(" ")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

/* function isValidYear(number: number): number is Exclude<Student['ano'], false> {
  return (
    Number(number) === 1 ||
    Number(number) === 2 ||
    Number(number) === 3 ||
    Number(number) === 4 ||
    Number(number) === 5 ||
    Number(number) === 6
  );
} */

function formatValue(value) {
  if (value === "" || value === "-") return undefined;
  if (value === "FALSE") return false;
  if (value === "TRUE") return true;
  if (value === "M") return "Masculino";
  if (value === "M") return "Femenino";
  if (!isNaN(value)) return Number(value);
  if (!isNaN(Date.parse(value))) return new Date(value);
  return value;
}

/* ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
["","","Año","Div","APELLIDO","NOMBRE","DNI","Correo Alumno/a","Código miEscuela","Género","Fecha de Nacimiento","País de Nacimiento","Lugar de Nacimiento","CUD","Adulto Responsable 1","","","","","","Adulto Responsable 2","","","","","","Nº de Legajo","Año de Ingreso","Repitencia","","","Movilidad","Año cursado en 2020","Materias PENDIENTES","","","","","Materias EN PROCESO (2020)","","1º año","","","","","","","","","","","2º año","","","","","","","","","","","3º año","","","","","","","","","","","","","","4º año","","","","","","","","","","","","","","","","","5º año","","","","","","","","","","","","","","","6º año","","","","","","","","","","","","","",""],
["","0","","","","","","","","","","","","","APELLIDO","Nombre","DNI","Teléfono","Correo","Nacionalidad","APELLIDO","Nombre","DNI","Teléfono","Correo","Nacionalidad","","","","","","","","#NAME?","","","","","","","Lengua y Literatura","Inglés","Historia","Geografía","Educación Ciudadana","Educación Física","Biología","Educación Artística","Matemática","Tecnol. de la Representación","Taller","Lengua y Literatura","Inglés","Historia","Geografía","Educación Ciudadana","Educación Física","Biología","Matemática","Física","Tecnol. de la Representación","Taller","Historia","Geografía","Educación Física","Educación Ciudadana","Inglés","Lengua y Literatura","Matemática","Física","Tecnol. de la Representación","Rep. Mediales, Comunicación y Lenguajes","Química","Taller de Tecnol. y del Control","Taller de TICs","Taller de Prod. Multimedial","Educación Física","Inglés","Ciudadanía y Trabajo","Lengua y Literatura","Ciencia y Tecnología","Matemática","Introd. a las Redes de Comunicación","Dispositivos Electrónicos Programables","Lab. de Soporte de Equipos Informáticos","Lab. de Desarrollo de Aplicaciones","Taller de Proy. Integradores I","Representación Sonora","Representación Visual","Diseño Web","Lab. de Postprod. de la Imagen y del Sonido","Taller de Tecnol. de la Imagen","Taller de Tecnol. del Sonido","Educación Física","Inglés","Lengua y Literatura","Matemática","Administración de Redes","Sist. Integrales de Información","Lab. de Soporte de Sist. Informáticos","Lab. de Desarrollo de Sist. de Información","Taller de Proy. Integradores II","Arte, Tecnol. y Comunicación","Guión y Narrativa","Lab. de Técnicas de Animación","Lab. de Proy. Multimediales","Taller de Proy. Audiovisual de Ficción","Taller de Proy. Audiovisual Documental","Educación Física","Ciudadanía y Trabajo","Gestión de los Procesos Productivos","Economía y Gestión de las Organizaciones","Admin. Avanzada de Sistemas y Redes","Procesamiento de la Información","Seguridad y Medioambiente","Gestión y Marketing Aplicado a TICs","Taller de Proy. Integradores III","Arte Digital","Lab. de Proy. Multimedial Ludificado","Lab. de Proy. de Tecnol. y Artes Electrónicas","Taller de Proy. Audio Visual Digital","Taller de Animación 3D","Prácticas Profesionalizantes"] */
