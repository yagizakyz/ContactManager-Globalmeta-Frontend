"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LinkPage() {
  const { user_id } = useParams();
  const [links, setLinks] = useState([]);
  const [cards, setCards] = useState([]);
  const [newLink, setNewLink] = useState({
    linkName: "",
    linkCon: "", // linkUrl yerine linkCon
    cardId: "",
  });
  const [token, setToken] = useState("");

  // Token'ı güvenli şekilde çek (Client Side)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token");
      if (t) setToken(t);
    }
  }, []);

  // Kullanıcının kartlarını çek
  const fetchCards = async () => {
    try {
      const res = await fetch(`baglanti-adresi`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCards(data);
    } catch (err) {
      console.error("Kartlar alınamadı.");
    }
  };

  // Kullanıcının mevcut linklerini çek
  const fetchLinks = async () => {
    try {
      const res = await fetch(`baglanti-adresi`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      alert("Linkler alınamadı.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchLinks();
      fetchCards();
    }
  }, [token, user_id]);

  const handleAdd = async () => {
    const { linkName, linkCon, cardId } = newLink;

    if (!linkName.trim() || !linkCon.trim() || !cardId) {
      alert("Tüm alanları doldurun ve bir kart seçin.");
      return;
    }

    try {
      const res = await fetch(`baglanti-adresi`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          linkName,
          linkCon, // Burada değişiklik
          cardId: parseInt(cardId),
          userId: parseInt(user_id),
        }),
      });

      if (res.ok) {
        setNewLink({ linkName: "", linkCon: "", cardId: "" });
        fetchLinks();
      } else {
        const result = await res.json();
        alert(result.message || "Link eklenemedi.");
      }
    } catch (err) {
      alert("Sunucu hatası.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Bu linki silmek istediğine emin misin?")) return;

    try {
      const res = await fetch(`baglanti-adresi`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) fetchLinks();
      else alert("Silinemedi.");
    } catch {
      alert("Sunucuya ulaşılamadı.");
    }
  };

  return (
    <div className="min-h-screen bg-[#3F48CC] flex justify-center items-start py-10 px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow space-y-4">
        <h1 className="text-xl font-bold text-center text-black">Link Oluştur</h1>
        {/* REVIEW : Component yapısı kullanmak gerekir, reusablity için. */}
        {/* Select: Kartvizit Seç */}
        <select
          name="cardId"
          value={newLink.cardId}
          onChange={(e) => setNewLink({ ...newLink, cardId: e.target.value })}
          className="w-full px-3 py-2 border rounded text-black"
        >
          <option value="">Kart Seç</option>
          {cards.map((card) => (
            <option key={card.cardId} value={card.cardId}>
              {card.cardName}
            </option>
          ))}
        </select>

        <input
          name="linkName"
          value={newLink.linkName}
          onChange={(e) => setNewLink({ ...newLink, linkName: e.target.value })}
          placeholder="Link Adı"
          className="w-full px-3 py-2 border rounded text-black"
        />

        <input
          name="linkCon"
          value={newLink.linkCon}
          onChange={(e) => setNewLink({ ...newLink, linkCon: e.target.value })}
          placeholder="https://example.com"
          className="w-full px-3 py-2 border rounded text-black"
        />

        <button
          onClick={handleAdd}
          className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded font-semibold"
        >
          Link Ekle
        </button>

        <hr className="border-gray-300" />

        <h2 className="text-lg font-semibold text-black">Tüm Linkler</h2>
        {links.length === 0 ? (
          <p className="text-gray-600 text-center">Henüz link yok.</p>
        ) : (
          <ul className="space-y-2">
            {links.map((link) => (
              <li
                key={link.id}
                className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded"
              >
                <a
                  href={link.linkCon} // Burada da linkCon kullanıyoruz
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {link.linkName}
                </a>
                <button
                  onClick={() => handleDelete(link.id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Sil
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
