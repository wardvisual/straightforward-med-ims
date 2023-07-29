export const getCurrentDate = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const getCurrentYear = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return currentYear;
};

export function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }

  const truncatedStr = str.slice(0, maxLength) + "...";
  return truncatedStr;
}

export const greetBasedOnTime = (name: string) => {
  const today = new Date();
  const curHr = today.getHours();

  let message = ``;
  if (curHr < 12) {
    message = `Good morning, ${name}!`;
  } else if (curHr < 18) {
    message = `Good afternoon, ${name}!`;
  } else {
    message = `Good evening, ${name}!`;
  }

  return message;
};
