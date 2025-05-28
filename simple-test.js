import fetch from 'node-fetch';

async function testServer() {
  try {
    console.log('🔍 Sunucu durumunu kontrol ediyorum...');
    
    // Önce basit bir GET isteği deneyelim
    const healthCheck = await fetch('http://localhost:8080');
    console.log('✅ Sunucu erişilebilir, status:', healthCheck.status);
    
    // Tools listesini alalım
    console.log('\n📋 Mevcut tools listesi alınıyor...');
    const toolsResponse = await fetch('http://localhost:8080/sse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/list',
        params: {}
      })
    });
    
    console.log('Tools response status:', toolsResponse.status);
    const toolsText = await toolsResponse.text();
    console.log('Tools response:', toolsText);
    
    if (toolsText) {
      try {
        const toolsData = JSON.parse(toolsText);
        console.log('✅ Tools başarıyla alındı:', JSON.stringify(toolsData, null, 2));
        
        // Eğer tools varsa, weather tool'unu test edelim
        if (toolsData.result && toolsData.result.tools) {
          const weatherTool = toolsData.result.tools.find(tool => tool.name === 'getWeather');
          if (weatherTool) {
            console.log('\n🌤️ Weather tool bulundu! Test ediliyor...');
            await testWeatherTool();
          } else {
            console.log('❌ Weather tool bulunamadı');
          }
        }
      } catch (parseError) {
        console.log('❌ JSON parse hatası:', parseError.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Test hatası:', error.message);
  }
}

async function testWeatherTool() {
  try {
    const weatherResponse = await fetch('http://localhost:8080/sse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/call',
        params: {
          name: 'getWeather',
          arguments: {
            latitude: 41.0082,
            longitude: 28.9784
          }
        }
      })
    });
    
    const weatherText = await weatherResponse.text();
    console.log('Weather response:', weatherText);
    
    if (weatherText) {
      try {
        const weatherData = JSON.parse(weatherText);
        console.log('🌡️ İstanbul hava durumu:', JSON.stringify(weatherData, null, 2));
      } catch (parseError) {
        console.log('❌ Weather JSON parse hatası:', parseError.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Weather test hatası:', error.message);
  }
}

testServer();
