const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

export const isValidEmail = (emailString: string): boolean => {
  return emailRegex.test(emailString);
};

export const isValidPassWord = (passwordString: string): boolean => {
  return passwordRegex.test(passwordString);
};
