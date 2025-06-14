"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function CardShowPage() {
  const { card_id } = useParams();
  const [card, setCard] = useState(null);
  const [links, setLinks] = useState([]);
  const [showToast, setShowToast] = useState(false); // Toast için state

  // REVIEW : API'den dönen data[0] ile ilk eleman alınıyor, veri yapısı değişirse hata çıkar. Backend'den tek kart nesnesi beklenmeli. Yada data[0] nın varlığı kontrol edilmeli.
  const fetchData = async () => {
    try {
      const res = await fetch(`baglanti-adresi`);
      if (res.ok) {
        const data = await res.json();
        const cardData = data[0];

        setCard(cardData);
        setLinks(cardData.links || []);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Kart verisi alınamadı.");
      }
    } catch (error) {
      alert("Veriler alınamadı.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [card_id]);

  // REVIEW : window.location.href doğrudan kullanılıyor, SSR ortamında undefined olabilir. Next.js router'dan alınmalı veya kontrol edilmeli.
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      // REVIEW : Toast için kütüphane veya kendi componentini kullanabilirsin
      setTimeout(() => {
        setShowToast(false);
      }, 3000); // 3 saniyede kaybolur
    } catch (err) {
      alert("Link kopyalanamadı.");
    }
  };

  if (!card) return <div className="text-white text-center mt-10">Yükleniyor...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4" style={{ backgroundColor: "#3F48CC" }}>
      <div
        className="w-full max-w-md p-6 rounded-xl shadow space-y-4 mb-6"
        style={{
          backgroundColor: card.cardBgColor || "#FFFFFF",
          color: card.cardTextColor || "#000000",
        }}
      >
        <h1 className="text-2xl font-bold text-center">{card.name}</h1>
        <p className="text-center">{card.title}</p>
        <p className="text-center">{card.company}</p>
        <p className="text-center">{card.email}</p>
        <p className="text-center">{card.phoneNumber}</p>

        <hr className="my-2 border-gray-300" />

        <h2 className="text-lg font-semibold text-center">Linkler</h2>
        {links.length === 0 ? (
          <p className="text-center">Link bulunamadı.</p>
        ) : (
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.linkId} className="text-center">
                <a
                  href={`https://${link.linkCon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline break-words"
                >
                  {link.linkName}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Paylaş Butonu */}
      <button
        onClick={handleShare}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold shadow"
      >
        Paylaş
      </button>

      {/* QR Kod */}
      <div className="bg-white p-4 rounded-xl shadow">
        {/* REVIEW : window nesnesi SSR'da undefined olabilir, kontrol edilmeli. */}
        <QRCode value={typeof window !== "undefined" ? window.location.href : ""} size={180} />
      </div>

      {/* Toast Mesajı */}
      {showToast && (
        <div className="fixed bottom-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
          Kartvizit linki kopyalandı!
        </div>
      )}
    </div>
  );
}
