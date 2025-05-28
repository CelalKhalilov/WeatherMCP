import express from 'express';
import cors from 'cors';
import { weatherTool } from '../tools/weather.js';

const app = express();
const PORT = parseInt(process.env.PORT || "8080", 10);

// CORS ayarları - mobil uygulamalar için
app.use(cors({
  origin: '*', // Geliştirme için, üretimde specific domain'ler kullanın
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Weather MCP API'
  });
});

// Weather endpoint - mobil uygulamalar için basitleştirilmiş
app.post('/api/weather', async (req, res) => {
  try {
    console.log(`📱 [MOBILE API] Yeni hava durumu isteği alındı:`, req.body);

    const { latitude, longitude, city } = req.body;

    // Parametre validasyonu
    if (!latitude || !longitude) {
      console.log(`❌ [MOBILE API] Eksik parametreler - lat: ${latitude}, lon: ${longitude}`);
      return res.status(400).json({
        error: 'Latitude ve longitude parametreleri gerekli',
        code: 'MISSING_COORDINATES'
      });
    }

    if (latitude < -90 || latitude > 90) {
      console.log(`❌ [MOBILE API] Geçersiz latitude: ${latitude}`);
      return res.status(400).json({
        error: 'Latitude -90 ile 90 arasında olmalı',
        code: 'INVALID_LATITUDE'
      });
    }

    if (longitude < -180 || longitude > 180) {
      console.log(`❌ [MOBILE API] Geçersiz longitude: ${longitude}`);
      return res.status(400).json({
        error: 'Longitude -180 ile 180 arasında olmalı',
        code: 'INVALID_LONGITUDE'
      });
    }

    console.log(`✅ [MOBILE API] Parametreler geçerli, weather tool çağrılıyor...`);

    // Weather tool'unu çağır
    const result = await weatherTool.execute({ latitude, longitude });

    console.log(`📋 [MOBILE API] Weather tool sonucu:`, result);

    // OpenWeatherMap formatındaki sonucu parse et
    const lines = result.split('\n');
    let temperature = null;
    let feelsLike = null;
    let description = '';
    let humidity = null;
    let windSpeed = null;
    let timezone = '';

    lines.forEach(line => {
      if (line.includes('Sıcaklık:')) {
        const tempMatch = line.match(/Sıcaklık: (\d+)°C.*Hissedilen: (\d+)°C/);
        if (tempMatch) {
          temperature = parseInt(tempMatch[1]);
          feelsLike = parseInt(tempMatch[2]);
        }
      } else if (line.includes('Durum:')) {
        description = line.replace('☁️ Durum: ', '').trim();
      } else if (line.includes('Nem:')) {
        const humidityMatch = line.match(/Nem: %(\d+)/);
        if (humidityMatch) {
          humidity = parseInt(humidityMatch[1]);
        }
      } else if (line.includes('Rüzgar:')) {
        const windMatch = line.match(/Rüzgar: (\d+) km\/h/);
        if (windMatch) {
          windSpeed = parseInt(windMatch[1]);
        }
      } else if (line.includes('Timezone:')) {
        timezone = line.replace('🌍 Timezone: ', '').trim();
      }
    });

    console.log(`🔍 [MOBILE API] Parse edilen veriler:`, {
      temperature, feelsLike, description, humidity, windSpeed, timezone
    });

    if (temperature !== null) {
      const responseData = {
        success: true,
        data: {
          location: {
            latitude,
            longitude,
            city: city || 'Bilinmeyen',
            timezone
          },
          weather: {
            temperature,
            feelsLike,
            temperatureUnit: '°C',
            description,
            humidity,
            windSpeed,
            windUnit: 'km/h',
            rawResponse: result
          },
          timestamp: new Date().toISOString(),
          source: 'OpenWeatherMap API'
        }
      };

      console.log(`✅ [MOBILE API] Başarılı response gönderiliyor:`, responseData);
      res.json(responseData);
    } else {
      console.log(`❌ [MOBILE API] Parse hatası - temperature bulunamadı`);
      res.status(500).json({
        error: 'Hava durumu verisi parse edilemedi',
        code: 'PARSE_ERROR',
        rawResponse: result
      });
    }

  } catch (error) {
    console.error(`💥 [MOBILE API] Hata oluştu:`, error);
    res.status(500).json({
      error: 'Hava durumu alınırken hata oluştu',
      code: 'WEATHER_API_ERROR',
      message: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
});

// Şehir listesi endpoint
app.get('/api/cities', (req, res) => {
  const cities = [
    { name: 'İstanbul', latitude: 41.0082, longitude: 28.9784, country: 'Türkiye' },
    { name: 'Ankara', latitude: 39.9334, longitude: 32.8597, country: 'Türkiye' },
    { name: 'İzmir', latitude: 38.4192, longitude: 27.1287, country: 'Türkiye' },
    { name: 'Antalya', latitude: 36.8969, longitude: 30.7133, country: 'Türkiye' },
    { name: 'Bursa', latitude: 40.1826, longitude: 29.0665, country: 'Türkiye' },
    { name: 'Adana', latitude: 37.0000, longitude: 35.3213, country: 'Türkiye' },
    { name: 'Gaziantep', latitude: 37.0662, longitude: 37.3833, country: 'Türkiye' },
    { name: 'Konya', latitude: 37.8667, longitude: 32.4833, country: 'Türkiye' }
  ];

  res.json({
    success: true,
    data: cities
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint bulunamadı',
    code: 'NOT_FOUND',
    availableEndpoints: [
      'GET /health',
      'POST /api/weather',
      'GET /api/cities'
    ]
  });
});

// Error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('API Error:', error);
  res.status(500).json({
    error: 'Sunucu hatası',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

// Sunucuyu başlat
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Mobile Weather API running on http://localhost:${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/health`);
  console.log(`🌤️  Weather API: http://localhost:${PORT}/api/weather`);
  console.log(`🏙️  Cities API: http://localhost:${PORT}/api/cities`);
});

export default app;
