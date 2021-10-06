const validateMobileNumberLength = (number = "", min = 4, max = 12) => {
  let isShort = false;
  let isLong = false;
  const numberLength = number.length;

  if (numberLength < min) {
    isShort = true;
  } else if (numberLength > max) {
    isLong = true;
  }

  return { isShort, isLong };
};

export const phoneNumberValidatorInput = (_, value) => {
  const { isShort, isLong } = validateMobileNumberLength(value, 6, 16);
  const mobileRegex = /^\+\d+$/;
  if (!isShort && !isLong && mobileRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("Please enter a valid phone number!"));
};
