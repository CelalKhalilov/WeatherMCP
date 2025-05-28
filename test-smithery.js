import fetch from 'node-fetch';

// Smithery.ai bilgilerinizi buraya girin
const SMITHERY_SERVER_ID = 'YOUR_SERVER_ID'; // Smithery.ai'den aldığınız server ID
const SMITHERY_API_KEY = 'YOUR_API_KEY';     // Smithery.ai API key'iniz
const SMITHERY_BASE_URL = 'https://api.smithery.ai/v1';

async function testSmitheryServer() {
  console.log('🔍 Smithery.ai MCP Server Test Başlıyor...\n');

  // 1. Server Status Check
  console.log('📊 Server durumu kontrol ediliyor...');
  try {
    const statusResponse = await fetch(`${SMITHERY_BASE_URL}/servers/${SMITHERY_SERVER_ID}/status`, {
      headers: {
        'Authorization': `Bearer ${SMITHERY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (statusResponse.ok) {
      const statusData = await statusResponse.json();
      console.log('✅ Server Status:', statusData);
    } else {
      console.log('❌ Status check failed:', statusResponse.status, statusResponse.statusText);
    }
  } catch (error) {
    console.log('❌ Status check error:', error.message);
  }

  // 2. Tools List Check
  console.log('\n🛠️ Mevcut tools listesi kontrol ediliyor...');
  try {
    const toolsResponse = await fetch(`${SMITHERY_BASE_URL}/servers/${SMITHERY_SERVER_ID}/tools`, {
      headers: {
        'Authorization': `Bearer ${SMITHERY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (toolsResponse.ok) {
      const toolsData = await toolsResponse.json();
      console.log('✅ Available Tools:', toolsData);
      
      // getWeather tool'u var mı kontrol et
      const hasWeatherTool = toolsData.tools && toolsData.tools.some(tool => tool.name === 'getWeather');
      if (hasWeatherTool) {
        console.log('🌤️ getWeather tool bulundu!');
      } else {
        console.log('❌ getWeather tool bulunamadı');
      }
    } else {
      console.log('❌ Tools list failed:', toolsResponse.status, toolsResponse.statusText);
    }
  } catch (error) {
    console.log('❌ Tools list error:', error.message);
  }

  // 3. Weather Tool Test
  console.log('\n🌤️ Weather tool test ediliyor...');
  try {
    const weatherResponse = await fetch(`${SMITHERY_BASE_URL}/servers/${SMITHERY_SERVER_ID}/tools/call`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SMITHERY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tool: 'getWeather',
        parameters: {
          latitude: 41.0082,
          longitude: 28.9784
        }
      })
    });

    console.log('Weather Response Status:', weatherResponse.status);
    
    if (weatherResponse.ok) {
      const weatherData = await weatherResponse.json();
      console.log('✅ Weather Data:', weatherData);
      console.log('🌡️ İstanbul Hava Durumu Başarıyla Alındı!');
    } else {
      const errorText = await weatherResponse.text();
      console.log('❌ Weather call failed:', weatherResponse.status, errorText);
    }
  } catch (error) {
    console.log('❌ Weather test error:', error.message);
  }

  // 4. Server Logs Check (eğer mevcut ise)
  console.log('\n📋 Server logs kontrol ediliyor...');
  try {
    const logsResponse = await fetch(`${SMITHERY_BASE_URL}/servers/${SMITHERY_SERVER_ID}/logs`, {
      headers: {
        'Authorization': `Bearer ${SMITHERY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (logsResponse.ok) {
      const logsData = await logsResponse.json();
      console.log('✅ Recent Logs:', logsData);
    } else {
      console.log('❌ Logs check failed:', logsResponse.status, logsResponse.statusText);
    }
  } catch (error) {
    console.log('❌ Logs check error:', error.message);
  }

  console.log('\n🎉 Test tamamlandı!');
  console.log('\n📝 Sonuç Özeti:');
  console.log('- Server durumunu kontrol ettik');
  console.log('- Tools listesini aldık');
  console.log('- Weather tool\'unu test ettik');
  console.log('- Server loglarını kontrol ettik');
}

// Kullanım talimatları
console.log('🚀 Smithery.ai MCP Server Test Script');
console.log('📋 Kullanım:');
console.log('1. SMITHERY_SERVER_ID değişkenini güncelleyin');
console.log('2. SMITHERY_API_KEY değişkenini güncelleyin');
console.log('3. Script\'i çalıştırın: node test-smithery.js\n');

// Eğer bilgiler girilmemişse uyarı ver
if (SMITHERY_SERVER_ID === 'YOUR_SERVER_ID' || SMITHERY_API_KEY === 'YOUR_API_KEY') {
  console.log('⚠️ UYARI: Lütfen önce SMITHERY_SERVER_ID ve SMITHERY_API_KEY değerlerini güncelleyin!');
  console.log('📍 Bu bilgileri Smithery.ai dashboard\'ından alabilirsiniz.');
} else {
  testSmitheryServer();
}
