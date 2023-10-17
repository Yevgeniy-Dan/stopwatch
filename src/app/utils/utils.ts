/**The method converts time in seconds to HH:MM:SS format */
export const convertTime = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 3600);
  const remainingSeconds = timeInSeconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return `${leadingZero(hours)}:${leadingZero(minutes)}:${leadingZero(
    seconds
  )}`;
};

/**The method always returns two digits,
 * put 0 before a single digit number */
const leadingZero = (n: number): string => {
  return n < 10 ? `0${n}` : `${n}`;
};
