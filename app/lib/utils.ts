import { formatDate } from "@/utils/utils";

export function countCoincidences(objects: any[], dates: any[]): any[] {
  let coincidences: any[] = [];

  dates.forEach((date: any) => {
    const quantity = objects.filter((object: any) => formatDate(object?.created_at) === date).length;
    coincidences.push(quantity);
  });

  return coincidences;
}