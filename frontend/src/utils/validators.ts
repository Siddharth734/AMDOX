export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isPhone = (v: string) => /^\+?[\d\s\-()]{8,}$/.test(v);
export const isNonEmpty = (v: string) => v.trim().length > 0;
export const isNumericCode = (v: string, len: number) => new RegExp(`^\\d{${len}}$`).test(v);
