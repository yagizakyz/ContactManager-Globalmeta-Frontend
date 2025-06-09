"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("baglanti-adresi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.access_token);
        localStorage.setItem("user_id", result.user_id);
        router.push(`/HomePage/${result.user_id}`);
      } else {
        alert(result.message || "Giriş başarısız");
      }
    } catch (err) {
      alert("Sunucuya bağlanılamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">Giriş Yap</h1>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            placeholder="mail@ornek.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Şifre</label>
          <input
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            placeholder="Şifrenizi girin"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="w-full text-indigo-600 hover:underline text-sm mt-2"
        >
          Kayıt Ol
        </button>
      </form>
    </main>
  );
}
