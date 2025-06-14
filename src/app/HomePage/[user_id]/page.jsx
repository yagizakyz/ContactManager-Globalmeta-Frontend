// REVIEW : API endpointleri sabit string olarak yazılmış, .env dosyasından alınmalı ve merkezi bir yerde yönetilmeli.
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { user_id } = useParams();
  const [cards, setCards] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  // REVIEW : Token localStorage'dan okunuyor, güvenlik için httpOnly cookie tercih edilmeli.
  const fetchCards = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`baglanti-adresi`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Kartlar alınamadı.");
      const data = await response.json();
      setCards(data);
    } catch (err) {
      console.error(err);
      alert("Kartlar yüklenirken hata oluştu.");
    }
  };

  useEffect(() => {
    fetchCards();
  }, [user_id]);

  // REVIEW : DOM'a doğrudan erişim (document.querySelectorAll) React paradigmasına uygun değil, ref ve state ile yönetilmeli.
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuItems = document.querySelectorAll(".menu-wrapper");
      let clickedInside = false;

      menuItems.forEach((menuItem) => {
        if (menuItem.contains(event.target)) {
          clickedInside = true;
        }
      });

      if (!clickedInside) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // REVIEW : Silme işlemi için endpoint'e id parametresi eklenmemiş, !gerekiyorsa! ilgili kartın id'si API'ye gönderilmeli.
  const handleDelete = async (card_id) => {
    const token = localStorage.getItem("token");
    if (!confirm("Bu Kartviziti silmek istediğine emin misin?")) return;

    try {
      const res = await fetch(`baglanti-adresi`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ deleted: true }),
      });

      if (res.ok) {
        setOpenMenuId(null);
        fetchCards(); // sayfayı yenile
      } else {
        alert("Silinemedi.");
      }
    } catch {
      alert("Sunucuya ulaşılamadı.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#3F48CC] flex justify-center items-start py-10 px-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 flex flex-col gap-5 shadow-lg">
        <button
          onClick={() => router.push(`/CardCreatePage/${user_id}`)}
          className="bg-red-800 text-white py-2 rounded-md font-semibold"
        >
          Kartvizit Oluştur
        </button>

        <button
          onClick={() => router.push(`/LinkPage/${user_id}`)}
          className="bg-sky-400 text-white py-2 rounded-md font-semibold"
        >
          Link Oluştur
        </button>

        <div className="space-y-3">
          {cards.length === 0 ? (
            <p className="text-gray-600 text-center">Hiç kart bulunamadı.</p>
          ) : (
            cards.map((card) => (
              <div
                key={card.id}
                className="flex justify-between items-center border-b pb-2 relative"
              >
                <span className="font-semibold text-black">{card.cardName}</span>

                <div className="relative menu-wrapper">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === card.id ? null : card.id)}
                    className="text-xl text-black"
                  >
                    ⋯
                  </button>

                  {openMenuId === card.id && (
                    <div className="absolute right-0 mt-2 bg-black border rounded shadow z-10 flex flex-col text-sm w-32 menu-wrapper">
                      <button
                        onClick={() => router.push(`/CardShowPage/${card.id}`)}
                        className="px-4 py-2 hover:bg-black-100 text-left text-white"
                      >
                        Görüntüle
                      </button>
                      <button
                        onClick={() => router.push(`/CardUpdatePage/${card.id}`)}
                        className="px-4 py-2 hover:bg-black-100 text-left text-white"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(card.id)}
                        className="px-4 py-2 hover:bg-black-100 text-left text-red-600"
                      >
                        Sil
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <button
          onClick={handleLogout}
          className="bg-gray-300 text-black py-2 rounded-md font-medium"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
