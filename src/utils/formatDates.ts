import dayjs, { Dayjs } from "dayjs";
import isoWeekday from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeekday);

export function formatFullDate(date: Dayjs) {
  const day = dayjs(date).date();
  const month = dayjs(date).format("MMMM");
  const year = dayjs(date).year();

  const monthToUpperCaseTheFirstLetter =
    month.charAt(0).toUpperCase() + month.slice(1);

  const dateFormatted = `${day} de ${monthToUpperCaseTheFirstLetter} de ${year}`;

  return dateFormatted;
}

export function getDay(date: Dayjs) {
  const day = dayjs(date).date();

  return day;
}

export function getMonth(date: Dayjs) {
  const month = dayjs(date).format("MMM");

  return month;
}

export function getYear(date: Dayjs) {
  const year = dayjs(date).year();

  return year;
}

export function getDayOfWeek(date: Dayjs) {
  const weekDay = dayjs(date).format("ddd");

  return weekDay;
}
