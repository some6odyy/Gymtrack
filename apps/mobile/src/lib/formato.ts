// ─────────────────────────────────────────────────────────────────────────────
// Fechas y números · Zona: Utilidades
//
// Qué hace: las ayudas chicas de las pantallas: mostrar una fecha corta ("mar 30 sep"), leer un
// número escrito con coma o punto ("47,5") y mostrarlo con coma decimal.
// Tócalo cuando: quieras cambiar cómo se ve una fecha o qué se acepta al escribir un número.
// Depende de: nada.
// ─────────────────────────────────────────────────────────────────────────────

// ── Fechas ───────────────────────────────────────────────────────────────────
const DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** La fecha y hora de ahora en ISO. Es el formato en que se guardan todas las fechas. */
export function ahoraIso(): string {
  return new Date().toISOString();
}

/**
 * "mar 30 sep" a partir de una fecha ISO, en hora local del teléfono. Se arma a mano y no con
 * toLocaleDateString para que se vea igual en Android, iOS y web.
 */
export function fmtFecha(iso: string): string {
  const d = new Date(iso);
  return `${DIAS[d.getDay()]} ${d.getDate()} ${MESES[d.getMonth()]}`;
}

// ── Números ──────────────────────────────────────────────────────────────────
/** "47,5" o "47.5" a número; vacío o inválido devuelve null. */
export function parseNumero(texto: string): number | null {
  const t = texto.trim().replace(',', '.');
  if (t === '') return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

/** 47.5 → "47,5". Hasta dos decimales, sin ceros de sobra. */
export function fmtNum(n: number): string {
  return String(Math.round(n * 100) / 100).replace('.', ',');
}
