"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  // REVIEW : useState ile tanımlanan state isimleri küçük harfle başlamalıdır (örn. name, setName). Büyük harfle başlatmak React component veya class isimleriyle karışıklık yaratabilir.
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !surname || !email || !phoneNumber || !password) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    setLoading(true);

    try {
      // REVIEW : API adresi "baglanti-adresi" olarak sabit yazılmış. Bunu bir environment variable veya config dosyasından almak daha güvenli ve sürdürülebilirdir.
      // Ayrıca, bu işlemler contextte veya bir helper klasöründe tanımlanması daha iyi olur.
      const response = await fetch("baglanti-adresi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          surname,
          email,
          phoneNumber,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert("Kayıt başarısız: " + (errorData.message || response.statusText));
        return;
      }

      const data = await response.json();
      alert("Kayıt başarılı!");
      router.push("/login");
    } catch (error) {
      alert("Sunucuya bağlanılamadı: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-green-400 to-blue-600 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-700">
          Kayıt Ol
        </h1>

        <label htmlFor="Name" className="block text-gray-700 mb-2 font-medium">
          Ad
        </label>
        <input
          id="Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Adınızı girin"
          className="w-full rounded border border-gray-300 p-3 mb-4 placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        <label htmlFor="Surname" className="block text-gray-700 mb-2 font-medium">
          Soyad
        </label>
        <input
          id="Surname"
          type="text"
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Soyadınızı girin"
          className="w-full rounded border border-gray-300 p-3 mb-4 placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        <label htmlFor="Email" className="block text-gray-700 mb-2 font-medium">
          Email
        </label>
        <input
          id="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mail@ornek.com"
          className="w-full rounded border border-gray-300 p-3 mb-4 placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        <label htmlFor="PhoneNumber" className="block text-gray-700 mb-2 font-medium">
          Telefon Numarası
        </label>
        <input
          id="PhoneNumber"
          type="tel"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+90 5XX XXX XX XX"
          className="w-full rounded border border-gray-300 p-3 mb-4 placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        <label htmlFor="Password" className="block text-gray-700 mb-2 font-medium">
          Şifre
        </label>
        <input
          id="Password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifrenizi girin"
          className="w-full rounded border border-gray-300 p-3 mb-6 placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/login")}
          disabled={loading}
          className="mt-4 w-full rounded border border-blue-600 py-3 text-blue-600 font-semibold hover:bg-blue-50 transition disabled:opacity-50"
        >
          Giriş Yap
        </button>
      </form>
    </main>
  );
}
