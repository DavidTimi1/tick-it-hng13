export function validateForm(name, email, password, confirmedPassword) {
  const n = name.trim().replace(/\s+/g, " ");
  const e = email.trim();
  const p = password.trim();
  const c = confirmedPassword.trim();

  const nameOk = /^[\p{L}][\p{L}\p{M}' .-]{1,149}$/u.test(n);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
  const passOk = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(p);

  return {
    name: !n ? "This field is required" : !nameOk ? "Must contain at least 2 letters" : null,
    email: !e ? "This field is required" : !emailOk ? "Invalid email address" : null,
    password: !p ? "This field is required" : !passOk ? "Password must be at least 6 characters long and include uppercase, lowercase, and a number" : null,
    confirmedPassword: !c ? "This field is required" : c !== p ? "Passwords do not match" : null,
  };
}
