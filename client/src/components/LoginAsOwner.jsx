import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginAsOwner = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleOwnerLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/owner/dashboard"); // ✅ Redirects here
    } catch (err) {
      console.error("Owner login failed:", err);
    }
  };

  return (
    <form onSubmit={handleOwnerLogin} className="flex flex-col gap-3 p-4">
      <input
        type="email"
        placeholder="Enter any email"
        className="border px-3 py-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Login as Owner
      </button>
    </form>
  );
};

export default LoginAsOwner;
