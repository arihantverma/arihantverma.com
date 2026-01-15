import { DateTime } from "luxon";
import { readableDateFormatForLuxon } from './constants.js';

export default function getReadableDate(dateObj) {
  return DateTime.fromJSDate(dateObj, { zone: "utc+05:30" }).toFormat(
    readableDateFormatForLuxon
  );
}

