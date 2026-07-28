import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful");

      navigate("/dashboard");
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-slate-950
      flex
      items-center
      justify-center
      text-white
      px-4
      "
    >
      <form
        onSubmit={handleLogin}
        className="
        bg-slate-900
        p-10
        rounded-2xl
        w-full
        max-w-md
        shadow-xl
        border
        border-slate-800
        "
      >
        <h1
          className="
          text-4xl
          font-bold
          text-center
          mb-8
          "
        >
          Welcome Back ✈️
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="
          w-full
          px-4
          py-3
          mb-5
          rounded-lg
          bg-slate-800
          border
          border-slate-700
          outline-none
          focus:border-blue-500
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="
          w-full
          px-4
          py-3
          mb-6
          rounded-lg
          bg-slate-800
          border
          border-slate-700
          outline-none
          focus:border-blue-500
          "
        />

        {message && (
          <p
            className={`mb-4 text-center ${
              message === "Login successful"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          bg-blue-600
          py-3
          rounded-lg
          font-semibold
          hover:bg-blue-700
          transition
          disabled:opacity-60
          "
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="
            text-blue-400
            ml-2
            cursor-pointer
            hover:underline
            "
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;