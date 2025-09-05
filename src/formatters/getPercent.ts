/**
 * Вычисляет процент первого числа от второго
 * @param numerator - числитель (первое число)
 * @param denominator - знаменатель (второе число)
 * @returns процент в виде числа от 0 до 100
 */
export function getPercent(numerator: number, denominator: number): number {
  // Проверка на валидность входных данных
  if (!isFinite(numerator) || !isFinite(denominator)) {
    return 0;
  }

  // Проверка на NaN
  if (isNaN(numerator) || isNaN(denominator)) {
    return 0;
  }

  // Проверка на деление на ноль
  if (denominator === 0) {
    return 0;
  }

  // Вычисление процента
  const result = (numerator / denominator) * 100;

  // Проверка результата на валидность
  if (!isFinite(result) || isNaN(result)) {
    return 0;
  }

  // Ограничение процента от 0 до 100
  const clampedResult = Math.max(0, Math.min(100, result));

  return Math.round(clampedResult);
}
