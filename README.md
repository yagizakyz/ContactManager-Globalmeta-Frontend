Bu proje, React ve Next.js kullanılarak geliştirilmiş bir kartvizit ve bağlantı yönetim uygulamasıdır.

## Özellikler

- Kullanıcı kaydı ve giriş işlemleri
- Kartvizit oluşturma, düzenleme, silme ve görüntüleme
- Kartvizitlere özel bağlantı (link) ekleme ve silme
- Kartvizit detayında paylaşılabilir bağlantı ve QR kod oluşturma
- Modern ve responsive arayüz (TailwindCSS)

## Kurulum

1. **Depoyu klonlayın:**

   ```bash
   git clone <repo-url>
   cd ContactManager-Globalmeta-Frontend
   ```

2. **Bağımlılıkları yükleyin:**

   ```bash
   npm install
   ```

3. **Çevresel değişkenleri ayarlayın:**

   Proje kök dizininde bir `.env.local` dosyası oluşturun ve API adreslerinizi buraya ekleyin:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://api.ornek.com
   ```

4. **Projeyi başlatın:**

   ```bash
   npm run dev
   ```

   Uygulama varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## Kullanım

1. **Kayıt Olun ve Giriş Yapın:**
   - Kayıt sayfasından yeni kullanıcı oluşturun, ardından giriş yapın.
2. **Ana Sayfa:**
   - Giriş yaptıktan sonra ana sayfada kartvizitlerinizi ve "Kartvizit Oluştur" ile "Link Oluştur" butonlarını göreceksiniz.
3. **Kartvizit Oluşturma:**
   - "Kartvizit Oluştur" butonuna tıklayarak yeni kartvizit ekleyin. Tüm alanları doldurun, arka plan ve yazı rengini seçin.
4. **Link Ekleme:**
   - Ana sayfadan "Link Oluştur" sayfasına gidin. Kartvizit seçin, link adı ve bağlantısını girin, ekleyin. Alt kısımda mevcut linklerinizi görebilir ve silebilirsiniz.
5. **Kartvizit İşlemleri:**
   - Kartvizitlerin yanındaki üç noktaya tıklayarak "Görüntüle", "Düzenle" veya "Sil" işlemlerini yapabilirsiniz.
6. **Kartvizit Detayı:**
   - "Görüntüle" ile kartvizit detayına ulaşın. Bağlantılara tıklayabilir, paylaş butonuyla linki kopyalayabilir veya QR kodunu kullanabilirsiniz.

## Proje Yapısı

```text
src/
  app/
    login/           # Giriş sayfası
    signup/          # Kayıt sayfası
    HomePage/        # Ana sayfa ve kartvizit listesi
    CardCreatePage/  # Kartvizit oluşturma
    CardShowPage/    # Kartvizit detay
    CardUpdatePage/  # Kartvizit güncelleme
    LinkPage/        # Link ekleme ve listeleme
```
