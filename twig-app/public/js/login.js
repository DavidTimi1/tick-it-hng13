document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  const emailInput = form.querySelector("#email");
  const passwordInput = form.querySelector("#password");
  const emailError = form.querySelector("#emailError");
  const passwordError = form.querySelector("#passwordError");

  const showError = (el, msg) => {
    el.textContent = msg;
    el.classList.toggle("hidden", !msg);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const errors = validateForm(emailInput.value, passwordInput.value);
    showError(emailError, errors.email || "");
    showError(passwordError, errors.password || "");

    if (errors.email || errors.password) return;

    try {
      const res = await fetch("/?page=login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });

      const data = await res.json();
      if (data.success) {
        window.location.href = "/?page=dashboard";
      } else {
        showError(emailError, data.errors?.email || "");
        showError(passwordError, data.errors?.password || "");
      }
    } catch {
      alert("Something went wrong. Try again.");
    }
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.getElementById("loginForm");
//   if (!form) return; // page guard

//   const emailInput = form.querySelector("#email");
//   const passwordInput = form.querySelector("#password");
//   const emailError = form.querySelector("#emailError");
//   const passwordError = form.querySelector("#passwordError");

//   const showError = (element, message) => {
//     element.textContent = message;
//     element.classList.toggle("hidden", !message);
//   };

//   const validateField = (field) => {
//     const errors = validateForm(
//       field === "email" ? emailInput.value : null,
//       field === "password" ? passwordInput.value : null
//     );

//     if (field === "email") showError(emailError, errors.email || "");
//     if (field === "password") showError(passwordError, errors.password || "");
//   };

//   emailInput.addEventListener("blur", () => validateField("email"));
//   passwordInput.addEventListener("blur", () => validateField("password"));

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const errors = validateForm(emailInput.value, passwordInput.value);

//     showError(emailError, errors.email || "");
//     showError(passwordError, errors.password || "");

//     if (!errors.email && !errors.password) {
//       // Simulate login success
//       console.log("✅ Logged in successfully!");
//       form.reset();
//       window.location.href = "/dashboard"; // replace with real route
//     }
//   });
// });
