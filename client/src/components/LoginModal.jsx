import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const LoginModal = ({ closeModal }) => {
  const { loginUser, signupUser, loginOwner } = useAppContext();
  const [role, setRole] = useState(null);
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === "owner") {
      await loginOwner(formData.email); // Only email is used
    } else if (formType === "login") {
      await loginUser(formData.email, formData.password);
    } else {
      await signupUser(formData.name, formData.email, formData.password);
    }

    closeModal();
  };

  if (!role) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded p-6 w-[90%] max-w-sm text-center">
          <h2 className="text-lg font-semibold mb-4">Login as</h2>
          <button
            onClick={() => setRole("user")}
            className="w-full py-2 mb-3 bg-blue-600 text-white rounded"
          >
            Login as User
          </button>
          <button
            onClick={() => setRole("owner")}
            className="w-full py-2 bg-gray-800 text-white rounded"
          >
            Login as Owner
          </button>
          <button
            onClick={closeModal}
            className="mt-4 text-sm text-gray-500 underline"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-[90%] max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {role === "owner"
            ? "Owner Login"
            : formType === "login"
            ? "User Login"
            : "User Signup"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {role === "user" && formType === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />

          {(role === "user" || role === "owner") && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required={role === "user"} // optional for owner
            />
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded"
          >
            {role === "owner"
              ? "Login"
              : formType === "login"
              ? "Login"
              : "Signup"}
          </button>
        </form>

        {role === "user" && (
          <p className="text-sm mt-4 text-center">
            {formType === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setFormType("signup")}
                  className="text-blue-600 underline"
                >
                  Signup
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setFormType("login")}
                  className="text-blue-600 underline"
                >
                  Login
                </button>
              </>
            )}
          </p>
        )}

        <button
          onClick={closeModal}
          className="block mx-auto mt-4 text-sm text-gray-500 underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
