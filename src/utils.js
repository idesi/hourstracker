export default {
  minutesToHoursAndMinutes: m => {
    if (!m) {
      return '';
    }

    const hours = Math.floor(m / 60, 0);
    const minutes = m % 60;

    return { hours, minutes };
  },

  formattedDateTime(m) {
    if (!m) {
      return;
    }

    const { hours, minutes } = this.minutesToHoursAndMinutes(m);
    return `${hours}hrs${minutes ? ' ' + minutes + 'minutes' : ''}`;
  }
};
