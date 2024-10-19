// 닉네임 형식 검사
export const isValidDisplayname = (display_name: string) => {
  return display_name.length >= 2;
};

// 이메일 형식 검사
export const isValidEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

//  비밀번호 형식 검사
export const isValidPassword = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // 유효한 문자 조합 개수 계산
  const typesCount = [
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;

  // 최소 10자리 이상
  if (password.length >= 10 && typesCount >= 2) {
    return true;
  }

  // 최소 8자리 이상
  if (password.length >= 8 && typesCount >= 3) {
    return true;
  }

  return false; // 유효하지 않은 비밀번호
};

// 인사말 형식 검사
export const isValidMessage = (message: string) => {
  return message.length >= 5;
};
