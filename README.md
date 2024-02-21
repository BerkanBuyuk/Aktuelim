# Aktuelim Uygulaması

Market ve mağazaların güncel kataloglarını kullanıcıya gösteren, Android ve iOS işletim sisteminde çalışan bir aktuel uygulaması.

### Uygulama Özellikleri

-- USER --

- Kullanıcı uygulamaya üye olup daha sonra üye girişi ile girebilir.
- Kategorilere göre marketler ve mağazalar filtrelenir ve kullanıcıya gösterilir.
- Seçilen markette, o marketin tüm katalogları listelenir.
- Seçilen katalogta, o kataloğun görseli görüntülenir.
- Seçilen katalog, favori butonuna basıldığında favorilere eklenir, tekrar basıldığında favorilerden kaldırılır.
- Favorilediği katalogları "Favoriler" sekmesinde görüntüleyebilir.
- Seçilen katalog görseli, cihaza indirilebilir.
- Seçilen kataloğa, kullanıcılar yorum yapabilir.
- Kullanıcı "Alışveriş Listesi" sekmesinden kendine özel alışveriş listesi hazırlayabilir. Ekleyip silebilir, güncelleyebilir.
- Kullanıcı "Ayarlar" sekmesinden temayı ve dili değiştirebilir. "Hesap Ayarı" sekmesinden profil fotoğrafını, kullanıcı adını, ve kullanıcı isim soyisim değişikliği yapabilir.
- Kullanıcı "Bize Ulaşın" sekmesinden, uygulamayı yapan kişiye mail gönderebilir.

-- ADMIN --

- Admin yeni katalog ekleyebilir.
- Katalog düzenleyip silebilir.
- Yorumları silebilir.

## Kullanılan Teknolojiler

- Backend Nodejs (Express) ile yazılmıştır.
- Frontend React Native ile yazılmıştır. (Web tarafı NextJS ve Typescript ile yazılacaktır.)
- Nativewind (Tailwind) ile CSS yazılmıştır.
- Redux ile tema ve dil yapılmıştır.
- Async Storage (Local Storage) ile tema ve dil özellikleri tutulmuştur.
- SQLite ile CRUD alışveriş listesi yapılmıştır.
- MySQL ile veritabanı kullanılmıştır.
- Cloudinary ile görseller tutulmuştur.
- i18next ile türkçe ve ingilizce dil seçeneği yapılmıştır.
- Lottie ile gifler kullanılmıştır.
