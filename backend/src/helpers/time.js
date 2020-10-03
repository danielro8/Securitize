const moment = require("moment")
const isDateOlderThan = (timestamp, lapse, unit) => {
    console.log(timestamp, lapse, unit)
    return moment.unix(timestamp).isBefore(moment().subtract(lapse, unit));
}

module.exports = {isDateOlderThan}