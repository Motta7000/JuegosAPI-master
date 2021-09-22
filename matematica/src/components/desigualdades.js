const comparadores = ['=', '>', '<', '≥', '≤'];

const comparar = (comparador, a, b) =>
  comparador === '=' && a === b ||
  comparador === '>' && a > b ||
  comparador === '<' && a < b ||
  comparador === '≥' && a >= b ||
  comparador === '≤' && a <= b;

/**
 * Obtiene comparaciones aleatorias y sus resultados
 * @param {Number} cantidad - Cantidad de compardores
 * @param {Number} min Mínimo Inclusive
 * @param {Number} max Máximo Inclusive
 */
const random = (cantidad, min, max) => {
  const comparaciones = [];
  for (let k = 0; k < cantidad; k++) {
    const a = Math.floor(Math.random() * ((max - min) + 1)) + min;
    const b = Math.floor(Math.random() * ((max - min) + 1)) + min;
    const comparador = comparadores[Math.floor(Math.random() * comparadores.length)];
    comparaciones.push({
      desigualdad: `${a} ${comparador} ${b}`,
      correcto: comparar(comparador, a, b) ? 'true' : 'false'
    });
  }
  return comparaciones;
};

module.exports = { random };
