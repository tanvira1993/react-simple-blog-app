export const validateNull = (str) => {
  if (str == null || str === "") {
    return false;
  }
  return true;
};

export const validateLength = (value, length) => {
  if (value == null) {
    return false;
  }
  return value.length >= length;
};

export const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validatePasswordConfirmation = (
  password,
  passwordConfirmation
) => {
  return password === passwordConfirmation;
};

