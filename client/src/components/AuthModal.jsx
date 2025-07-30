import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const AuthModal = ({ closeModal }) => {
  const { login, register } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      alert("Please fill all required fields");
      return;
    }

    if (isLogin) {
      await login(email, password);
      closeModal();
    } else {
      await register(name, email, password);
      setIsLogin(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-4 px-4 py-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p
          className="text-center mt-4 text-blue-600 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
        <button
          onClick={closeModal}
          className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;