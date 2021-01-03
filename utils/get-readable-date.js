const { DateTime } = require("luxon");
const { readableDateFormatForLuxon } = require('./constants.js');

function getReadableDate(dateObj) {
  return DateTime.fromJSDate(dateObj, { zone: "utc+05:30" }).toFormat(
    readableDateFormatForLuxon
  );
}

module.exports = getReadableDate
