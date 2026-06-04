# YER6 Final WL Panel

## Kurulum
npm install
npm run dev

## Admin
Discord ID: founder
Şifre: 123456

## Discord bağlantısı
Vercel > Settings > Environment Variables:
DISCORD_WEBHOOK_URL = Discord webhook linkin

Discord webhook almak:
Discord kanal ayarları > Entegrasyonlar > Webhooklar > Yeni Webhook > Webhook URL'sini kopyala.

## Yeni sistem
- Oyuncu paneli düzeltildi.
- Oyuncu panelinde Dashboard, Destek Aç, Taleplerim, Yetkili Başvuru, Cezalarım, Profilim var.
- Admin panelde Ceza Ver ve WL Takip var.
- Ceza verilince oyuncunun WL durumu alınır.
- Süreli cezalarda otomatik bitiş tarihi hesaplanır.
- WL Takip bölümünden ceza bitirilip WL geri verilebilir.
- Discord webhook varsa ceza/destek/başvuru bildirimleri Discord'a gider.


## Discord Komut Kopyalama
- Admin panel > Ceza Ver bölümünde hazır `/wl-ceza ver` komutu oluşur.
- Komutu Kopyala butonu eklendi.
- Admin panel > WL Takip bölümünde WL kaldır/ver komutları kopyalanabilir.
- Admin panel > Ceza Kayıtları bölümü eklendi.
