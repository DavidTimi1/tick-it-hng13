function validateForm(name, email, password, confirmedPassword) {
  const normalizedName = name?.trim().replace(/\s+/g, " ");
  const normalizedEmail = email?.trim().replace(/\s+/g, "");
  const normalizedPassword = password?.trim();
  const normalizedConfirmedPassword = confirmedPassword?.trim();

  const nameRegex = /^[\p{L}][\p{L}\p{M}' .-]{1,149}$/u;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  const errors = {
    name: !normalizedName
      ? "This field is required"
      : !nameRegex.test(normalizedName)
      ? "Must contain at least 2 letters"
      : null,

    email: !normalizedEmail
      ? "This field is required"
      : !emailRegex.test(normalizedEmail)
      ? "Invalid email address"
      : null,

    password: !normalizedPassword
      ? "This field is required"
      : normalizedPassword.length < 6 || !passwordRegex.test(normalizedPassword)
      ? "Password must be at least 6 characters long and include an uppercase, lowercase, and a number"
      : null,

    confirmedPassword:
      !normalizedConfirmedPassword ||
      normalizedConfirmedPassword !== normalizedPassword
        ? "Passwords do not match"
        : null,
  };

  return errors;
}
