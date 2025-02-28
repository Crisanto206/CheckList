import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const preguntas = [
  "Cuenta con Licencia OK VIGENTE?",
  "Cuenta con Póliza de Seguro Vigente?",
  "Cuenta con hologramas de PROFECO vigentes en cada equipo?",
  "El personal operativo cuenta con seguro social vigente?",
  "El estacionamiento cuenta con encargado(s) o responsable?",
  "La plantilla de cajeros y/o auxiliares completa?",
  "¿Quejas recibidas de tienda en estos 30 días?",
  "El personal cuenta con las siguientes características: Uniforme completo y en buen estado, gafete de identificación?",
  "El personal conoce y aplica el plan de contingencia?",
  "Cuenta con directorio de servicio de emergencia actualizado?",
  "Todas las entradas y salidas abiertas?",
  "Emisor de boletos por cada entrada y salida funcionando?",
  "Funcionan todos los cajeros de pago?",
  "Validadora (receptora) y TPV en cada salida y funcionando?",
  "Se cuenta con interfonía en el estacionamiento?",
  "Cuentan con CCTV y funcionan correctamente?",
  "Se realiza mantenimiento UPS / tiene alguna falla cuál es?",
  "Las casetas se encuentran en servicio dentro del horario de la tienda y en buenas condiciones?",
  "La funcionalidad de POS opera adecuadamente?",
  "Imagen de los equipos: hojalatería, pintura, limpieza, anclaje correcto?",
  "Oficina Administrativa en buenas condiciones?",
  "Cuenta con catálogo de firmas actualizado de gerencias?",
  "Cuenta con Kit de auxilio vial?",
  "Los tótems y señalamientos cuentan con la información completa, actualizada y en buenas condiciones?",
  "Se realiza el mantenimiento preventivo de equipos?",
  "El estacionamiento presenta baches?",
  "Los registros se encuentran en buen estado?",
  "Se ejecuta el plan de pintura de acuerdo al calendario compartido anualmente?",
  "La pintura en cajones se encuentra en buenas condiciones?",
  "La pintura en flechas de circulación se encuentra en buenas condiciones?",
  "Se realiza poda de pasto y setos?",
  "Faltan plantas y árboles en jardineras?",
  "Los troncos de los árboles están encalados?",
  "Se realiza el riego periódicamente?",
  "Existen lámparas fundidas?",
  "Se encuentra completa la plantilla de vigilancia de acuerdo a la necesidad de la operación?",
  "El personal de vigilancia cuenta con uniforme y gafete de identificación?",
  "El personal de vigilancia realiza los rondines en el estacionamiento?",
  "Cuentan con radios de intercomunicación?",
  "Cuentan con bitácora de novedades y se encuentra al día?",
  "El estacionamiento cuenta con extintores?",
  "Los extintores están vigentes?",
  "Gabinetes de extintores en buenas condiciones?",
  "Cuenta con señalización de ubicación de equipo de protección civil y rutas de evacuación en buen estado?",
  "Cuenta con material para limpieza y sanitización?",
  "Se lleva un control del total de pensiones?",
  "¿Recibimos de manera semanal los ingresos y afluencias de esta unidad?"
];

export default function Checklist() {
  const [respuestas, setRespuestas] = useState({});
  const [comentarios, setComentarios] = useState({});
  const [calificacion, setCalificacion] = useState(100);
  const ref = useRef();
  const handlePrint = useReactToPrint({ content: () => ref.current });

  const handleRespuesta = (id, respuesta) => {
    const nuevasRespuestas = { ...respuestas, [id]: respuesta };
    setRespuestas(nuevasRespuestas);
    calcularCalificacion(nuevasRespuestas);
  };

  const handleComentario = (id, comentario) => {
    setComentarios({ ...comentarios, [id]: comentario });
  };

  const calcularCalificacion = (respuestas) => {
    let puntaje = 100;
    if (respuestas[0] === "No") {
      puntaje = 0;
    } else {
      Object.values(respuestas).forEach((respuesta) => {
        if (respuesta === "No") puntaje -= 5;
      });
    }
    setCalificacion(Math.max(puntaje, 0));
  };

  return (
    <div ref={ref} className="p-12 bg-white rounded-lg shadow-lg max-w-6xl mx-auto print:w-full">
      <div className="flex justify-center mb-6">
        <img src="/logo-accessone.png" alt="AccessOne Logo" className="h-16" />
      </div>
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Checklist de Auditoría</h1>
      <h2 className={`text-xl font-semibold mb-4 text-center p-3 rounded-lg ${calificacion >= 90 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>Calificación: {calificacion}%</h2>
      <table className="w-full text-lg border-collapse border shadow-sm">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-4 border">Pregunta</th>
            <th className="p-4 border">Respuesta</th>
            <th className="p-4 border w-1/2">Comentario</th>
          </tr>
        </thead>
        <tbody>
          {preguntas.map((pregunta, index) => (
            <tr key={index} className={`border-b hover:bg-gray-200 ${respuestas[index] === 'No' ? 'bg-red-300' : ''}`}>
              <td className="p-4 text-gray-900 border">{pregunta}</td>
              <td className="p-4 border">
                <select
                  value={respuestas[index] || ""}
                  onChange={(e) => handleRespuesta(index, e.target.value)}
                  className="border p-3 rounded-md w-full text-lg bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                  <option value="N/A">N/A</option>
                </select>
              </td>
              <td className="p-4 border">
                <input
                  type="text"
                  value={comentarios[index] || ""}
                  onChange={(e) => handleComentario(index, e.target.value)}
                  className="border p-2 rounded-md w-full text-lg"
                  placeholder="Agregar comentario"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-6">
        <button onClick={handlePrint} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">Descargar PDF</button>
      </div>
    </div>
  );
}
