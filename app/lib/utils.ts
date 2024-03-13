export function countCoincidences(objects: any[], dates: any[]): any[] {
  let coincidences: any[] = [];

  dates.forEach((date: any) => {
    const quantity = objects.filter((object: any) => object.date === date).length;
    coincidences.push(quantity);
  });

  return coincidences;
}