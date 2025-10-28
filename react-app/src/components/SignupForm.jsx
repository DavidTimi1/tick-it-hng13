import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { validateForm } from "../utils/validateForm";

function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    const singleFieldError = validateForm(
      fieldName === "name" ? value : formData.name,
      fieldName === "email" ? value : formData.email,
      fieldName === "password" ? value : formData.password,
      fieldName === "confirmedPassword" ? value : formData.confirmedPassword
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
      formData.name,
      formData.email,
      formData.password,
      formData.confirmedPassword
    );
    setErrors(validationErrors);

    // Check if there are any errors
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== null
    );

    if (!hasErrors) {
      // Proceed to login if no errors
      signup(formData.name, formData.email, formData.password);
      toast.success("Sign Up successful!");
      setIsSubmitting(true);

      setTimeout(() => {
        navigate("/auth/login");
        setIsSubmitting(false);

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmedPassword: "",
        });
        setErrors({});
      }, 2000);
    } else {
      toast.error("Please fix the form errors");
    }
  }

  return (
    <section
      aria-labelledby="formTitle"
      className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8"
    >
      <h1
        id="formTitle"
        className="text-2xl font-bold text-center mb-4 text-green-700"
      >
        Create an Account
      </h1>

      <form
        aria-labelledby="formTitle"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={(e) => validateField("name", e.target.value)}
            aria-describedby="nameError"
            className={`w-full border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p id="nameError" className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

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
            onBlur={(e) => validateField("email", e.target.value)}
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
            onBlur={(e) => validateField("password", e.target.value)}
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

        <div>
          <label
            htmlFor="confirmedPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmedPassword"
            name="confirmedPassword"
            type="password"
            value={formData.confirmedPassword}
            onChange={handleChange}
            onBlur={(e) => validateField("confirmedPassword", e.target.value)}
            aria-describedby="passwordConfirmError"
            className={`w-full border ${
              errors.confirmedPassword ? "border-red-500" : "border-gray-300"
            } rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500`}
            placeholder="••••••••"
          />
          {errors.confirmedPassword && (
            <p id="passwordConfirmError" className="text-red-500 text-sm mt-1">
              {errors.confirmedPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition cursor-pointer"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account?
        <Link
          to="/auth/login"
          className="text-green-600 pl-1 font-medium hover:underline"
        >
          Log in
        </Link>
      </p>
    </section>
  );
}

export default SignupForm;
