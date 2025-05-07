


export async function GET({ request }) {
  // Obtener el parámetro 'key' de la URL (el nombre del archivo)
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  if (!key) {
    return new Response("Falta el parámetro 'key'", { status: 400 });
  }

  // Construir la URL para acceder al archivo PDF
  const url = `https://r2-worker.luisdanielmedina15.workers.dev/${key}`;

  try {
    // Descargar el archivo desde la URL generada
    const res = await fetch(url);

    // Verificar si la solicitud fue exitosa
    if (!res.ok) {
      return new Response("Archivo no encontrado", { status: 404 });
    }

    // Obtener el archivo en formato arrayBuffer
    const arrayBuffer = await res.arrayBuffer();
    
    // Definir el nombre del archivo para la descarga
    const fileName = key.split("/").pop();

    // Devolver el archivo como respuesta
    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
    return new Response("Error al descargar el archivo", { status: 500 });
  }
}
