export const ConvertTime = (time) => {
  const _LENGTH = time.length;
  let trimString = time.trim();
  let newString = trimString.substring(
    trimString.length - 2,
    trimString.length
  );

  let resultString = "";
  switch (newString) {
    case "am":
      let timeString = trimString.substring(0, 4);
      if (_LENGTH === 7) {
        resultString = "0" + timeString;
      } else {
        let timeString = trimString.substring(0, 5);
        resultString = timeString;
        console.log(timeString);
      }
      break;
    case "pm":
      if (trimString.length === 7) {
        trimString = "0" + trimString;
      }
      let timePMString = trimString.substring(0, 2);
      let timePMString2 = trimString.substring(2, 5);
      let timePMInt = parseInt(timePMString) + 12;
      resultString = `${timePMInt}` + timePMString2;
      break;
    default:
      break;
  }
  return resultString;
};
export const RevertTime = (time, x) => {
  if (x) {
    let newString = time.substring(0, 2);
    let newInt = parseInt(newString);
    return `${newInt}` + time.substring(2, 5) + " am";
  } else {
    let newString = time.substring(0, 2);
    if (parseInt(newString) > 12) {
      let newInt = parseInt(newString) - 12;
      return `${newInt}` + time.substring(2, 5) + " pm";
    } else {
      return `00` + time.substring(2, 5) + " pm";
    }
  }
};
