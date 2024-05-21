import { type Student } from "../types/types";

export function formatData(text: string): Student[] {
  const stringData = text.split("\r\n").map((row) => row.split("\t"));
  const header = stringData[0];
  const studentsData = stringData.slice(1).map((row) => {
    const student = {};
    row.forEach((value, index) => {
      if (!header[index].includes(".")) {
        student[header[index]] = formatValue(value);
      } else {
        const rootPropertie = header[index].split(".")[0];
        const internalPropertie = header[index].split(".")[1];
        student[rootPropertie] = {
          ...student[rootPropertie],
          [internalPropertie]: formatValue(value),
        };
      }
    });
    return student;
  });
  studentsData.forEach((obj) => console.log(obj));
  return studentsData.filter(
    (student) => student.dni !== undefined && student.apellido !== undefined
  );
}

function formatValue(value) {
  if (value === "" || value === "-") return undefined;
  if (value === "FALSE") return false;
  if (value === "TRUE") return true;
  if (!isNaN(value)) return Number(value);
  if (!isNaN(Date.parse(value))) return new Date(value);
  return value
}

/* ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
["","","Año","Div","APELLIDO","NOMBRE","DNI","Correo Alumno/a","Código miEscuela","Género","Fecha de Nacimiento","País de Nacimiento","Lugar de Nacimiento","CUD","Adulto Responsable 1","","","","","","Adulto Responsable 2","","","","","","Nº de Legajo","Año de Ingreso","Repitencia","","","Movilidad","Año cursado en 2020","Materias PENDIENTES","","","","","Materias EN PROCESO (2020)","","1º año","","","","","","","","","","","2º año","","","","","","","","","","","3º año","","","","","","","","","","","","","","4º año","","","","","","","","","","","","","","","","","5º año","","","","","","","","","","","","","","","6º año","","","","","","","","","","","","","",""],
["","0","","","","","","","","","","","","","APELLIDO","Nombre","DNI","Teléfono","Correo","Nacionalidad","APELLIDO","Nombre","DNI","Teléfono","Correo","Nacionalidad","","","","","","","","#NAME?","","","","","","","Lengua y Literatura","Inglés","Historia","Geografía","Educación Ciudadana","Educación Física","Biología","Educación Artística","Matemática","Tecnol. de la Representación","Taller","Lengua y Literatura","Inglés","Historia","Geografía","Educación Ciudadana","Educación Física","Biología","Matemática","Física","Tecnol. de la Representación","Taller","Historia","Geografía","Educación Física","Educación Ciudadana","Inglés","Lengua y Literatura","Matemática","Física","Tecnol. de la Representación","Rep. Mediales, Comunicación y Lenguajes","Química","Taller de Tecnol. y del Control","Taller de TICs","Taller de Prod. Multimedial","Educación Física","Inglés","Ciudadanía y Trabajo","Lengua y Literatura","Ciencia y Tecnología","Matemática","Introd. a las Redes de Comunicación","Dispositivos Electrónicos Programables","Lab. de Soporte de Equipos Informáticos","Lab. de Desarrollo de Aplicaciones","Taller de Proy. Integradores I","Representación Sonora","Representación Visual","Diseño Web","Lab. de Postprod. de la Imagen y del Sonido","Taller de Tecnol. de la Imagen","Taller de Tecnol. del Sonido","Educación Física","Inglés","Lengua y Literatura","Matemática","Administración de Redes","Sist. Integrales de Información","Lab. de Soporte de Sist. Informáticos","Lab. de Desarrollo de Sist. de Información","Taller de Proy. Integradores II","Arte, Tecnol. y Comunicación","Guión y Narrativa","Lab. de Técnicas de Animación","Lab. de Proy. Multimediales","Taller de Proy. Audiovisual de Ficción","Taller de Proy. Audiovisual Documental","Educación Física","Ciudadanía y Trabajo","Gestión de los Procesos Productivos","Economía y Gestión de las Organizaciones","Admin. Avanzada de Sistemas y Redes","Procesamiento de la Información","Seguridad y Medioambiente","Gestión y Marketing Aplicado a TICs","Taller de Proy. Integradores III","Arte Digital","Lab. de Proy. Multimedial Ludificado","Lab. de Proy. de Tecnol. y Artes Electrónicas","Taller de Proy. Audio Visual Digital","Taller de Animación 3D","Prácticas Profesionalizantes"] */
