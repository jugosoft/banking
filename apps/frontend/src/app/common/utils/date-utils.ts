/**
 * Получить разницу в днях между двумя датами
 * @param a Дата начала
 * @param b Дата окончания
 * @returns Разница между двумя датами в днях
 */
export function dateDiffInDays(a: Date, b: Date) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}
