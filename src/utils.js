const utils = {
  getCurrentDate: () => {
    const dateObj = new Date();
    const { month, day, year } = getDateParts(dateObj);
    return day + '-' + month + '-' + year;
  }
};

const getDateParts = dateObj => {
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  return { month, year, day };
};

export default utils;
