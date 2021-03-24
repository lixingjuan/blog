const moment = require("moment");

exports.relativeTime = time =>
  moment(time)
    .startOf("hour")
    .fromNow();
