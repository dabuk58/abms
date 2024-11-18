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
