"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CardUpdatePage() {
  const router = useRouter();
  const { card_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const [form, setForm] = useState({
    cardName: "",
    name: "",
    title: "",
    company: "",
    email: "",
    phoneNumber: "",
    cardBgColor: "#FFFFFF",
    cardTextColor: "#000000",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token");
      if (t) setToken(t);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchCard = async () => {
      try {
        const res = await fetch(`baglanti-adresi`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          console.log("Gelen DATA:", data);

          const cardData = data[0]; // 👈 Şimdi doğru!

          setForm({
            cardName: cardData.cardName || "",
            name: cardData.name || "",
            title: cardData.title || "",
            company: cardData.company || "",
            email: cardData.email || "",
            phoneNumber: cardData.phoneNumber || "",
            cardBgColor: cardData.cardBgColor || "#FFFFFF",
            cardTextColor: cardData.cardTextColor || "#000000",
          });
        } else {
          const errorData = await res.json();
          console.log("Hata:", errorData);
          alert(errorData.message || "Kart verisi alınamadı.");
        }
      } catch (error) {
        console.log("Catch Error:", error);
        alert("Kart verisi yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [token, card_id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch(`baglanti-adresi`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("Kart başarıyla güncellendi.");
        const userId = localStorage.getItem("user_id");
        router.push(`/HomePage/${userId}`);
      } else {
        const result = await res.json();
        alert(result.message || "Güncelleme başarısız.");
      }
    } catch (err) {
      alert("Sunucuya ulaşılamadı.");
    }
  };

  if (loading) return <div className="text-white text-center mt-10">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-[#3F48CC] flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-xl shadow space-y-4"
      >
        <h1 className="text-xl font-bold text-center text-black">Kart Güncelle</h1>

        <input
          name="cardName"
          value={form.cardName}
          onChange={handleChange}
          placeholder="Kartvizit Adı"
          className="w-full px-3 py-2 border rounded text-black"
        />
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ad"
          className="w-full px-3 py-2 border rounded text-black"
        />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ünvan"
          className="w-full px-3 py-2 border rounded text-black"
        />
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Şirket"
          className="w-full px-3 py-2 border rounded text-black"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded text-black"
        />
        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Telefon"
          className="w-full px-3 py-2 border rounded text-black"
        />

        {/* Kart Arka Plan Rengi */}
        <select
          name="cardBgColor"
          value={form.cardBgColor}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded text-black"
        >
          <option value="#FFFFFF">Beyaz</option>
          <option value="#000000">Siyah</option>
          <option value="#FF0000">Kırmızı</option>
          <option value="#FFFDD0">Krem</option>
          <option value="#FFC0CB">Pembe</option>
          <option value="#ADD8E6">Açık Mavi</option>
        </select>

        {/* Kart Yazı Rengi */}
        <select
          name="cardTextColor"
          value={form.cardTextColor}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded text-black"
        >
          <option value="#000000">Siyah</option>
          <option value="#FFFFFF">Beyaz</option>
          <option value="#FF0000">Kırmızı</option>
          <option value="#FFFDD0">Krem</option>
          <option value="#FFC0CB">Pembe</option>
          <option value="#ADD8E6">Açık Mavi</option>
        </select>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded font-semibold"
        >
          Güncelle
        </button>
      </form>
    </div>
  );
}
