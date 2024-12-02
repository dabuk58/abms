import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

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

export function enhanceCalendarDates(
  control: FormControl,
  datePipe: DatePipe
): void {
  let dateFrom, dateTo;
  const dates = control.value;

  if (!dates) return;

  if (Array.isArray(dates)) {
    dateFrom = control.value[0];
    dateTo = control.value[1];
  } else {
    dateFrom = dates.split(' - ')[0];
    dateTo = dates.split(' - ')[1];
  }

  if (!dateFrom && !dateTo) return;

  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(dateFrom)) {
    dateFrom = datePipe.transform(control.value[0], 'dd.MM.yyyy');
    dateTo = datePipe.transform(control.value[1], 'dd.MM.yyyy');
  }

  if (dateFrom && (!dateTo || dateFrom === dateTo)) {
    const enhancedDateTo = incrementDateByOneDay(dateFrom);
    control.patchValue(`${dateFrom} - ${enhancedDateTo}`);
  }
}

export function addOneDay(date: Date): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + 1);
  return result;
}

export function subtractOneDay(date: Date): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - 1);
  return result;
}

export function mapDottedDateToDashedDate(date: string): string {
  const [day, month, year] = date.split('.');

  return `${year}-${month}-${day}`;
}

export function mapFullDateToDashedDate(date: Date): string {
  const dottedDate = mapApiDate(date);
  const [day, month, year] = dottedDate.split('.');

  return `${year}-${month}-${day}`;
}
