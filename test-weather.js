import fetch from 'node-fetch';

async function testWeather(latitude, longitude, cityName = '') {
  try {
    const response = await fetch('http://localhost:8080/sse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/call',
        params: {
          name: 'getWeather',
          arguments: {
            latitude: latitude,
            longitude: longitude
          }
        }
      })
    });

    const data = await response.json();
    console.log(`\n🌤️  ${cityName} Hava Durumu:`);
    console.log(`📍 Koordinatlar: ${latitude}, ${longitude}`);

    if (data.result && data.result.content) {
      console.log(`🌡️  ${data.result.content[0].text}`);
    } else {
      console.log('❌ Hava durumu alınamadı:', data);
    }
  } catch (error) {
    console.error('❌ Hata:', error.message);
  }
}

// Test örnekleri
async function runTests() {
  console.log('🚀 MCP Weather Tool Test Başlıyor...\n');

  await testWeather(41.0082, 28.9784, 'İstanbul');
  await testWeather(39.9334, 32.8597, 'Ankara');
  await testWeather(38.4192, 27.1287, 'İzmir');
  await testWeather(36.8969, 30.7133, 'Antalya');
}

runTests();
