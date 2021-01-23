import jstz from 'jstz';

// Time setup
const timezone = jstz.determine();
const dateFormat = () => {
  const date = new Date().toLocaleString('en-US', {
    timeZone: timezone.name(),
  });
  return date;
};

export const dateNow = () => {
  const date = new Date().getTime();
  return date;
};

export const todayDate = () => {
  const date = new Date().toLocaleDateString('en-US', {
    timeZone: timezone.name(),
  });
  return date;
};

export const dateToTimestamp = (a: any) => {
  const date = new Date(a).getTime();
  return date;
};

const fixedDateToTimestamp = (a: any) => {
  const date = new Date(a).getTime();
  return date;
};

const dateToLocale = (a: any) => {
  const date = new Date(a).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return date;
};

// module.exports.fixedDateToTimestamp = fixedDateToTimestamp;
// module.exports.dateFormat = dateFormat;
// module.exports.dateToTimestamp = dateToTimestamp;
// module.exports.dateToLocale = dateToLocale;
// module.exports.todayDate = todayDate;
