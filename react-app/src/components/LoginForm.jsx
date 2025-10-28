import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import { validateForm } from "../utils/validateForm";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    const singleFieldError = validateForm(
      fieldName === "email" ? value : formData.email,
      fieldName === "password" ? value : formData.password
    );

    setErrors((prev) => ({
      ...prev,
      [fieldName]: singleFieldError[fieldName],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm(
      null,
      formData.email,
      formData.password,
      null
    );
    setErrors(validationErrors);
    const { emailError, passwordError } = validationErrors;

    // Check if there are any errors
    if (!emailError && !passwordError) {
      // Proceed to dashboard if no errors
      const success = login(formData.email, formData.password);
      if (success) {
        navigate("/dashboard");

        setFormData({
          email: "",
          password: "",
        });
        setErrors({});
      }
    }
  }

  return (
    <section
      aria-labelledby="formTitle"
      className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8"
    >
      <h1
        id="formTitle"
        className="text-2xl font-bold text-center mb-6 text-green-700"
      >
        Login to continue
      </h1>

      <form
        onSubmit={handleSubmit}
        aria-labelledby="formTitle"
        className="flex flex-col gap-4"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={(e) => validateField(e.target.value)}
            aria-describedby="emailError"
            className={`w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500`}
            placeholder="name@example.com"
          />
          {errors.email && (
            <p id="emailError" className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={(e) => validateField(e.target.value)}
            aria-describedby="passwordError"
            className={`w-full border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p id="passwordError" className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Login
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Don't have an account?
        <Link
          to="/auth/signup"
          className="text-green-600 pl-1 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </section>
  );
}

export default LoginForm;
