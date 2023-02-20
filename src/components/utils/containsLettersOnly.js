export const containsLettersOnly = (string) => {
  const letters = /^[A-Za-z\s]*$/;
  if (string.match(letters)) {
    return true;
  } else {
    return false;
  }
};
