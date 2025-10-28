document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-form='signup']");
  if (!form) return;

  const inputs = {
    name: form.querySelector("[name='name']"),
    email: form.querySelector("[name='email']"),
    password: form.querySelector("[name='password']"),
    confirmPassword: form.querySelector("[name='confirmPassword']"),
  };

  const errorEls = {
    name: form.querySelector("[data-error='name']"),
    email: form.querySelector("[data-error='email']"),
    password: form.querySelector("[data-error='password']"),
    confirmPassword: form.querySelector("[data-error='confirmPassword']"),
  };

  const validateSingleField = (fieldName, value) => {
    console.log(fieldName);
    const errors = validateForm(
      fieldName === "name" ? value : inputs.name.value,
      fieldName === "email" ? value : inputs.email.value,
      fieldName === "password" ? value : inputs.password.value,
      fieldName === "confirmPassword" ? value : inputs.confirmPassword.value
    );
    errorEls[fieldName].textContent = errors[fieldName] || "";
    inputs[fieldName].classList.toggle("border-red-500", !!errors[fieldName]);
    inputs[fieldName].classList.toggle("border-gray-300", !errors[fieldName]);
  };

  Object.entries(inputs).forEach(([field, input]) => {
    input.addEventListener("blur", (e) =>
      validateSingleField(field, e.target.value)
    );
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const errors = validateForm(
      inputs.name.value,
      inputs.email.value,
      inputs.password.value,
      inputs.confirmPassword.value
    );
    console.log(errors);

    let hasError = false;
    Object.entries(errors).forEach(([field, message]) => {
      errorEls[field].dataset.error = message || "";
      inputs[field].classList.toggle("border-red-500", !!message);
      inputs[field].classList.toggle("border-gray-300", !message);
      if (message) hasError = true;
    });

    if (hasError) return;

    try {
      const formData = new FormData(form);
      const response = await fetch("/?page=signup", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        alert("✅ Sign up successful! You can now log in.");
        window.location.href = "/?page=login";
      } else {
        alert(result.message || "❌ Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("⚠️ Something went wrong. Please try again.");
    }
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("signupForm");
//   if (!form) return;

//   const emailInput = form.querySelector("#email");
//   const passwordInput = form.querySelector("#password");
//   const emailError = form.querySelector("#emailError");
//   const passwordError = form.querySelector("#passwordError");

//   const showError = (el, msg) => {
//     el.textContent = msg;
//     el.classList.toggle("hidden", !msg);
//   };

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const errors = validateForm(emailInput.value, passwordInput.value);
//     showError(emailError, errors.email || "");
//     showError(passwordError, errors.password || "");

//     if (errors.email || errors.password) return;

//     try {
//       const res = await fetch("/?page=signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: new URLSearchParams({
//           email: emailInput.value,
//           password: passwordInput.value,
//         }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         alert("Signup successful! Redirecting to login...");
//         window.location.href = "/?page=login";
//       } else {
//         showError(emailError, data.errors?.email || "");
//         showError(passwordError, data.errors?.password || "");
//       }
//     } catch {
//       alert("Something went wrong. Try again.");
//     }
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector("[data-form='signup']");
//   if (!form) return;

//   const inputs = {
//     name: form.querySelector("[name='name']"),
//     email: form.querySelector("[name='email']"),
//     password: form.querySelector("[name='password']"),
//     confirmPassword: form.querySelector("[name='confirmPassword']"),
//   };

//   const errorEls = {
//     name: form.querySelector("[data-error='name']"),
//     email: form.querySelector("[data-error='email']"),
//     password: form.querySelector("[data-error='password']"),
//     confirmPassword: form.querySelector("[data-error='confirmPassword']"),
//   };

//   const validateSingleField = (fieldName, value) => {
//     const errors = validateForm(
//       fieldName === "name" ? value : inputs.name.value,
//       fieldName === "email" ? value : inputs.email.value,
//       fieldName === "password" ? value : inputs.password.value,
//       fieldName === "confirmPassword" ? value : inputs.confirmPassword.value
//     );
//     errorEls[fieldName].textContent = errors[fieldName] || "";
//     inputs[fieldName].classList.toggle("border-red-500", !!errors[fieldName]);
//     inputs[fieldName].classList.toggle("border-gray-300", !errors[fieldName]);
//   };

//   Object.entries(inputs).forEach(([field, input]) => {
//     input.addEventListener("blur", (e) => {
//       validateSingleField(field, e.target.value);
//     });
//   });

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const errors = validateForm(
//       inputs.name.value,
//       inputs.email.value,
//       inputs.password.value,
//       inputs.confirmPassword.value
//     );

//     let hasError = false;
//     Object.entries(errors).forEach(([field, message]) => {
//       errorEls[field].textContent = message || "";
//       inputs[field].classList.toggle("border-red-500", !!message);
//       inputs[field].classList.toggle("border-gray-300", !message);
//       if (message) hasError = true;
//     });

//     if (!hasError) {
//       alert("Sign Up successful! (Simulated)");
//       form.reset();
//       Object.values(errorEls).forEach((el) => (el.textContent = ""));
//     }
//   });
// });
