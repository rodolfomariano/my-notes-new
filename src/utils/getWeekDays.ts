import dayjs, { Dayjs } from "dayjs";

export function getToday() {
  const today = dayjs();

  return today;
}

export function getCurrencyWeekDays() {
  const weekDays = [];
  const firstDayOfCurrencyWeek = dayjs().startOf("week");
  const firstDayOfNextWeek = dayjs().endOf("week");

  for (
    let date = dayjs(firstDayOfCurrencyWeek);
    date <= firstDayOfNextWeek;
    date = date.add(1, "day")
  ) {
    weekDays.push(date);
  }

  return weekDays;
}

export function getLastWeek(day: Dayjs) {
  const weekDates = [];
  const firstDayOfLastWeek = dayjs(day).startOf("week").add(-1, "week");
  const firstDayOfNextWeek = dayjs(firstDayOfLastWeek).endOf("week");

  for (
    let date = dayjs(firstDayOfLastWeek);
    date.isBefore(firstDayOfNextWeek);
    date = date.add(1, "day")
  ) {
    weekDates.push(date);
  }
  return weekDates;
}

export function getNextWeek(day: Dayjs) {
  const weekDates = [];
  const firstDayOfNextWeek = dayjs(day).startOf("week").add(1, "week");
  const endDate = dayjs(firstDayOfNextWeek).endOf("week");

  for (
    let date = dayjs(firstDayOfNextWeek);
    date.isBefore(endDate);
    date = date.add(1, "day")
  ) {
    weekDates.push(date);
  }

  return weekDates;
}
