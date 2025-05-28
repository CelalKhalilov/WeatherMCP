# OpenWeather MCP Server

OpenWeatherMap API kullanarak gerçek zamanlı hava durumu verileri sağlayan Model Context Protocol (MCP) sunucusu.

## 🌤️ Özellikler

- **Gerçek Zamanlı Hava Durumu**: OpenWeatherMap API ile güncel hava durumu bilgileri
- **Detaylı Meteorolojik Veriler**: Sıcaklık, nem, rüzgar, basınç, görüş mesafesi
- **Global Kapsam**: Dünya genelinde herhangi bir koordinat için hava durumu
- **Türkçe Dil Desteği**: Hava durumu açıklamaları Türkçe
- **MCP Uyumlu**: Smithery.ai ve diğer MCP platformları ile uyumlu

## 🚀 Kurulum

### Smithery.ai'de Kullanım

1. Bu repository'yi Smithery.ai'ye yükleyin
2. OpenWeatherMap API key'inizi environment variable olarak ekleyin:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```
3. Server otomatik olarak başlayacaktır

### Yerel Kurulum

```bash
# Repository'yi klonlayın
git clone https://github.com/yourusername/openweather-mcp-server.git
cd openweather-mcp-server

# Bağımlılıkları yükleyin
npm install

# Sunucuyu başlatın
npm start
```

## 🛠️ Kullanım

### getWeather Tool

Belirtilen koordinatlarda hava durumu bilgilerini alır.

**Parametreler:**
- `latitude` (number): Enlem koordinatı (-90 ile 90 arası)
- `longitude` (number): Boylam koordinatı (-180 ile 180 arası)

**Örnek Kullanım:**

```json
{
  "tool": "getWeather",
  "parameters": {
    "latitude": 41.0082,
    "longitude": 28.9784
  }
}
```

**Örnek Çıktı:**
```
🌡️ Sıcaklık: 18°C (Hissedilen: 17°C)
☁️ Durum: parçalı bulutlu
💧 Nem: %63
🌬️ Basınç: 1012 hPa
💨 Rüzgar: 9 km/h (270°)
👁️ Görüş: 10 km
☁️ Bulutluluk: %75
🏙️ Şehir: İstanbul, TR
🌍 Timezone: UTC+3
```

## 📍 Popüler Şehir Koordinatları

| Şehir | Latitude | Longitude |
|-------|----------|-----------|
| İstanbul | 41.0082 | 28.9784 |
| Ankara | 39.9334 | 32.8597 |
| İzmir | 38.4192 | 27.1287 |
| Antalya | 36.8969 | 30.7133 |
| New York | 40.7128 | -74.0060 |
| London | 51.5074 | -0.1278 |
| Tokyo | 35.6762 | 139.6503 |

## 🔧 Yapılandırma

### Environment Variables

- `OPENWEATHER_API_KEY`: OpenWeatherMap API anahtarınız (gerekli)

### API Key Alma

1. [OpenWeatherMap](https://openweathermap.org/api) sitesine gidin
2. Ücretsiz hesap oluşturun
3. API key'inizi alın
4. Current Weather Data API'sini kullanın (ücretsiz)

## 📱 Mobil Uygulama Entegrasyonu

Bu MCP server'ı Smithery.ai üzerinden mobil uygulamanızda kullanabilirsiniz:

1. Smithery.ai'de server'ı deploy edin
2. Mobil uygulamanızdan Smithery.ai API'sine bağlanın
3. `getWeather` tool'unu çağırın

## 🔒 Güvenlik

- API key'inizi environment variable olarak saklayın
- Production'da rate limiting kullanın
- HTTPS kullanın

## 📄 Lisans

MIT License

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun
3. Değişikliklerinizi commit edin
4. Pull request gönderin

## 📞 Destek

Sorularınız için issue açabilirsiniz.
