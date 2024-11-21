export function fillString(template: string, ...args: string[]): string {
  return template.replace(/{(\d+)}/, (_, index) => args[index] || '');
}

export function removeEmptyParams(obj: any): any {
  const cleanedObj: any = {};

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
