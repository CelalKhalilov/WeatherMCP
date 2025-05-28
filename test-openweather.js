import { weatherTool } from './src/tools/weather.ts';

async function testOpenWeatherAPI() {
  console.log('🧪 OpenWeatherMap API Test Başlıyor...\n');

  try {
    console.log('📍 İstanbul için test...');
    const istanbulResult = await weatherTool.execute({
      latitude: 41.0082,
      longitude: 28.9784
    });
    console.log('✅ İstanbul sonucu:', istanbulResult);

    console.log('\n📍 Ankara için test...');
    const ankaraResult = await weatherTool.execute({
      latitude: 39.9334,
      longitude: 32.8597
    });
    console.log('✅ Ankara sonucu:', ankaraResult);

  } catch (error) {
    console.error('❌ Test hatası:', error);
  }
}

testOpenWeatherAPI();
