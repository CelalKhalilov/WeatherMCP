import { z } from 'zod';
import fetch from 'node-fetch';
// OpenWeatherMap API Key - Environment variable'dan al, yoksa default kullan
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'ddb572ea8e850f6cdbb234f8bc17a9fc';
// Zod schema for input validation
const WeatherToolParams = z.object({
    latitude: z.number().min(-90).max(90).describe('Latitude coordinate'),
    longitude: z.number().min(-180).max(180).describe('Longitude coordinate')
});
export const weatherTool = {
    name: 'getWeather',
    description: 'Enlem ve boylam ver, OpenWeatherMap API ile detaylı hava durumu bilgisi döner.',
    parameters: WeatherToolParams,
    async execute({ latitude, longitude }) {
        console.log(`🌤️ [WEATHER API] Hava durumu isteniyor - Lat: ${latitude}, Lon: ${longitude}`);
        // Current Weather API (ücretsiz) kullanıyoruz
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=tr`;
        console.log(`🔗 [WEATHER API] API URL: ${url}`);
        try {
            console.log(`📡 [WEATHER API] OpenWeatherMap Current Weather API'sine istek gönderiliyor...`);
            const res = await fetch(url);
            console.log(`📊 [WEATHER API] Response Status: ${res.status} ${res.statusText}`);
            if (!res.ok) {
                const errorText = await res.text();
                console.error(`❌ [WEATHER API] API Hatası: ${res.status} - ${errorText}`);
                throw new Error(`OpenWeatherMap API hatası: ${res.status} - ${errorText}`);
            }
            const data = await res.json();
            console.log(`✅ [WEATHER API] Başarılı response alındı:`, JSON.stringify(data, null, 2));
            const weather = data.weather[0];
            const temperature = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like);
            const humidity = data.main.humidity;
            const pressure = data.main.pressure;
            const windSpeed = Math.round(data.wind.speed * 3.6); // m/s to km/h
            const windDeg = data.wind.deg;
            const visibility = Math.round(data.visibility / 1000); // meters to km
            const cloudiness = data.clouds.all;
            const result = `🌡️ Sıcaklık: ${temperature}°C (Hissedilen: ${feelsLike}°C)
☁️ Durum: ${weather.description}
💧 Nem: %${humidity}
🌬️ Basınç: ${pressure} hPa
💨 Rüzgar: ${windSpeed} km/h (${windDeg}°)
👁️ Görüş: ${visibility} km
☁️ Bulutluluk: %${cloudiness}
�️ Şehir: ${data.name}, ${data.sys.country}
�🌍 Timezone: UTC${data.timezone >= 0 ? '+' : ''}${data.timezone / 3600}`;
            console.log(`📋 [WEATHER API] Formatlanmış sonuç:`, result);
            return result;
        }
        catch (error) {
            console.error(`💥 [WEATHER API] Hata oluştu:`, error);
            throw error;
        }
    }
};
//# sourceMappingURL=weather.js.map