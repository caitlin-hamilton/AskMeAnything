//The 'timestamp' function parameter is your timestamp passed in milliseconds.
function timeDifference(timestamp, locale) {

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const current = Date.now();
  const elapsed = current - timestamp;

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (elapsed < msPerMinute) {
       return rtf.format(-Math.floor(elapsed/1000), 'seconds');   
  }

  else if (elapsed < msPerHour) {
       return rtf.format(-Math.floor(elapsed/msPerMinute), 'minutes'); 
  }

  else if (elapsed < msPerDay) {
       return rtf.format(-Math.floor(elapsed/msPerHour), 'hours');  
  }

  else {
      return new Date(timestamp).toLocaleDateString(locale);   
  }
}

const fifteenSecondsAgo = new Date();
const tenMinutesAgo = new Date();
const twoHoursAgo = new Date();

fifteenSecondsAgo.setSeconds(fifteenSecondsAgo.getSeconds() - 15);
tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

console.log(timeDifference(fifteenSecondsAgo.getTime(), 'en'));
console.log(timeDifference(fifteenSecondsAgo.getTime(), 'es'));

console.log(timeDifference(tenMinutesAgo.getTime(), 'en'));
console.log(timeDifference(tenMinutesAgo.getTime(), 'es'));

console.log(timeDifference(twoHoursAgo.getTime(), 'en'));
console.log(timeDifference(twoHoursAgo.getTime(), 'es'));