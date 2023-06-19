import { SignEnum } from './signEnum';

const dateToEpoch = (date) => Math.floor(date.getTime() / 1000);
const epochToDate = (unixTimestamp) => new Date(unixTimestamp * 1000);
const randomNumber = (to, from = 0) => Math.floor(Math.random() * (to - from) + from);

export const minimalPESELDate = new Date(Date.UTC(1800, 0, 1));
export const maximumPESELDate = new Date(Date.UTC(2300, 11, 31));

function randomDate(end = new Date(), start) {
  const endTime = dateToEpoch(end);

  if (start) {
    const startTime = dateToEpoch(start);
    if (startTime > endTime) {
      throw new Error('End date is before start date!');
    }

    return epochToDate(randomNumber(endTime, startTime));
  }

  return epochToDate(randomNumber(endTime));
}

export function generateDate(sign, startDate, endDate) {
  switch (sign) {
    case SignEnum.Equal:
      return randomDate(endDate, startDate);

    case SignEnum.Greater:
      return randomDate(maximumPESELDate, endDate);

    case SignEnum.Lesser:
      return randomDate(startDate, minimalPESELDate);
  }

  throw new Error(`Unknown sign: ${sign}`);
}
