'use client';

import { useRouter } from "next/navigation";
import { useState, useCallback, ChangeEvent, FormEvent } from "react";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleLogin = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); 

    if (email === "admin@gmail.com" && password === "123456") {
      document.cookie = `token=test_token; path=/;`;
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  }, [email, password, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-4 py-2 mt-1"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2 mt-1"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
  type="submit"
  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
>
  Login
</button>

        </form>
      </div>
    </div>
  );
}
