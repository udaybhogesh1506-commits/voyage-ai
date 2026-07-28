import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      await registerUser(name, email, password);

      setMessage("Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          "Account creation failed"
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
        onSubmit={handleSignup}
        className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-10
        w-full
        max-w-md
        shadow-xl
        "
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          Create Account 🌍
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="
          w-full
          mb-4
          px-4
          py-3
          rounded-lg
          bg-slate-800
          border
          border-slate-700
          focus:border-blue-500
          outline-none
          "
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="
          w-full
          mb-4
          px-4
          py-3
          rounded-lg
          bg-slate-800
          border
          border-slate-700
          focus:border-blue-500
          outline-none
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={6}
          required
          className="
          w-full
          mb-6
          px-4
          py-3
          rounded-lg
          bg-slate-800
          border
          border-slate-700
          focus:border-blue-500
          outline-none
          "
        />

        {message && (
          <p
            className={`mb-4 text-center ${
              message === "Account created successfully"
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
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
            text-blue-400
            ml-2
            cursor-pointer
            hover:underline
            "
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default Signup;