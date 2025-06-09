"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function CardCreatePage() {
  const router = useRouter();
  const { user_id } = useParams();

  const [form, setForm] = useState({
    name: "",
    title: "",
    company: "",
    email: "",
    phoneNumber: "",
    cardFontType: "Arial",
    cardBgColor: "#FFFFFF",
    cardTextColor: "#000000",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("baglanti-adresi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, userId: parseInt(user_id) }),
      });

      if (res.ok) {
        alert("Kart oluşturuldu!");
        router.push(`/HomePage/${user_id}`);
      } else {
        const result = await res.json();
        alert(result.message || "Kart oluşturulamadı.");
      }
    } catch (err) {
      alert("Sunucuya ulaşılamadı.");
    }
  };

  return (
    <div className="min-h-screen bg-[#3F48CC] flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-xl shadow space-y-4"
      >
        <h1 className="text-xl font-bold text-center text-black">Yeni Kartvizit Oluştur</h1>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ad"
          required
          className="w-full px-3 py-2 border rounded text-black"
        />
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ünvan"
          className="w-full px-3 py-2 border rounded text-black"
        />
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Şirket"
          className="w-full px-3 py-2 border rounded text-black"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-3 py-2 border rounded text-black"
        />
        <input
          type="tel"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="Telefon"
          className="w-full px-3 py-2 border rounded text-black"
        />

        <div>
          <label className="text-sm text-gray-700">Arka Plan Rengi</label>
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
        </div>

        <div>
          <label className="text-sm text-gray-700">Yazı Rengi</label>
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
        </div>

        <input
          type="text"
          name="cardName"
          value={form.cardName}
          onChange={handleChange}
          placeholder="Kartvizit Adı"
          className="w-full px-3 py-2 border rounded text-black"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
        >
          Kartvizit Oluştur
        </button>
      </form>
    </div>
  );
}
