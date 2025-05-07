// src/lib/api.js
export async function obtenerArchivos() {
    const res = await fetch('https://r2-worker.luisdanielmedina15.workers.dev/archivos');
    const data = await res.json();
    return data;
  }
  