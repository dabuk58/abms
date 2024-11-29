export function fillString(template: string, ...args: string[]): string {
  return template.replace(/{(\d+)}/, (_, index) => args[index] || '');
}

export function removeEmptyParams(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    if (obj !== undefined && obj !== null && obj !== '') {
      return obj;
    } else {
      return undefined;
    }
  }

  const cleanedObj: any = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    const value = removeEmptyParams(obj[key]);
    if (value !== undefined && value !== null && value !== '') {
      cleanedObj[key] = value;
    }
  });

  return cleanedObj;
}

export function incrementDateByOneDay(dateString: string): string {
  const [day, month, year] = dateString.split('.').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + 1);

  const newDay = date.getDate().toString().padStart(2, '0');
  const newMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const newYear = date.getFullYear();

  return `${newDay}.${newMonth}.${newYear}`;
}

export function mapApiDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function mapToApiDate(date: string): string {
  const [day, month, year] = date.split('.').map(Number);

  const parsedDate = new Date(year, month - 1, day);
  parsedDate.setHours(0, 0, 0, 0);

  const yearStr = parsedDate.getFullYear();
  const monthStr = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const dayStr = String(parsedDate.getDate()).padStart(2, '0');

  return `${yearStr}-${monthStr}-${dayStr}T00:00:00.000Z`;
}
