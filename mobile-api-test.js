import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:8080';

async function testMobileAPI() {
  console.log('📱 Mobile Weather API Test Başlıyor...\n');

  // 1. Health Check
  console.log('🔍 Health Check...');
  try {
    const healthResponse = await fetch(`${BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health Check:', healthData);
  } catch (error) {
    console.log('❌ Health Check hatası:', error.message);
    return;
  }

  // 2. Cities List
  console.log('\n🏙️ Şehir listesi alınıyor...');
  try {
    const citiesResponse = await fetch(`${BASE_URL}/api/cities`);
    const citiesData = await citiesResponse.json();
    console.log('✅ Şehirler:', citiesData.data.slice(0, 3)); // İlk 3 şehri göster
  } catch (error) {
    console.log('❌ Cities hatası:', error.message);
  }

  // 3. Weather Test - İstanbul
  console.log('\n🌤️ İstanbul hava durumu...');
  try {
    const weatherResponse = await fetch(`${BASE_URL}/api/weather`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: 41.0082,
        longitude: 28.9784,
        city: 'İstanbul'
      })
    });

    const weatherData = await weatherResponse.json();
    console.log('✅ İstanbul Hava Durumu:');
    console.log(`   🌡️ Sıcaklık: ${weatherData.data.weather.temperature}°C`);
    console.log(`   ☁️ Durum: ${weatherData.data.weather.description}`);
    console.log(`   📍 Konum: ${weatherData.data.location.city}`);
  } catch (error) {
    console.log('❌ Weather hatası:', error.message);
  }

  // 4. Weather Test - Ankara
  console.log('\n🌤️ Ankara hava durumu...');
  try {
    const weatherResponse = await fetch(`${BASE_URL}/api/weather`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: 39.9334,
        longitude: 32.8597,
        city: 'Ankara'
      })
    });

    const weatherData = await weatherResponse.json();
    console.log('✅ Ankara Hava Durumu:');
    console.log(`   🌡️ Sıcaklık: ${weatherData.data.weather.temperature}°C`);
    console.log(`   ☁️ Durum: ${weatherData.data.weather.description}`);
    console.log(`   📍 Konum: ${weatherData.data.location.city}`);
  } catch (error) {
    console.log('❌ Weather hatası:', error.message);
  }

  // 5. Error Test - Geçersiz koordinatlar
  console.log('\n❌ Hata testi (geçersiz koordinatlar)...');
  try {
    const errorResponse = await fetch(`${BASE_URL}/api/weather`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: 999, // Geçersiz
        longitude: 999  // Geçersiz
      })
    });

    const errorData = await errorResponse.json();
    console.log('✅ Hata doğru yakalandı:', errorData.error);
  } catch (error) {
    console.log('❌ Error test hatası:', error.message);
  }

  console.log('\n🎉 Tüm testler tamamlandı!');
}

testMobileAPI();
