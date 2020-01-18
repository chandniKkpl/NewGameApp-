export const checkError = error => {
    return error && error.message ? error : false;
  };