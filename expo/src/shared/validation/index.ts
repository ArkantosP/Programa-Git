export const COLOMBIAN_PHONE_REGEX = /^3\d{9}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidColombianPhone(phone: string): boolean {
  return COLOMBIAN_PHONE_REGEX.test(phone);
}

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}
