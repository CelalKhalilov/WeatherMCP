import fetch from 'node-fetch';

// Bu bilgileri Smithery.ai dashboard'ından alın
const SERVER_URL = 'YOUR_SMITHERY_SERVER_URL'; // Örnek: https://your-server.smithery.ai
const API_KEY = 'YOUR_API_KEY';

async function quickHealthCheck() {
  console.log('🏥 Hızlı Health Check...\n');

  // 1. Basit ping testi
  console.log('📡 Server\'a ping atılıyor...');
  try {
    const response = await fetch(SERVER_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
      timeout: 10000 // 10 saniye timeout
    });

    console.log(`📊 Response Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      console.log('✅ Server erişilebilir!');
      
      // Response body'yi kontrol et
      const data = await response.text();
      console.log('📄 Response preview:', data.substring(0, 200) + '...');
      
    } else {
      console.log('❌ Server yanıt vermiyor');
    }

  } catch (error) {
    console.log('💥 Bağlantı hatası:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('🔴 Server kapalı veya erişilemiyor');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('⏰ Timeout - Server yavaş yanıt veriyor');
    } else {
      console.log('❓ Bilinmeyen hata');
    }
  }

  // 2. MCP Protocol Test
  console.log('\n🔧 MCP Protocol test...');
  try {
    const mcpResponse = await fetch(`${SERVER_URL}/mcp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/list',
        params: {}
      })
    });

    if (mcpResponse.ok) {
      const mcpData = await mcpResponse.json();
      console.log('✅ MCP Protocol çalışıyor!');
      console.log('🛠️ Tools:', mcpData.result?.tools?.length || 0, 'adet');
    } else {
      console.log('❌ MCP Protocol hatası:', mcpResponse.status);
    }

  } catch (error) {
    console.log('❌ MCP test hatası:', error.message);
  }
}

// Bilgi kontrolü
if (SERVER_URL === 'YOUR_SMITHERY_SERVER_URL' || API_KEY === 'YOUR_API_KEY') {
  console.log('⚠️ UYARI: Lütfen SERVER_URL ve API_KEY değerlerini güncelleyin!');
  console.log('');
  console.log('📋 Smithery.ai\'den almanız gerekenler:');
  console.log('1. Server URL (örnek: https://your-server.smithery.ai)');
  console.log('2. API Key (Settings > API Keys)');
  console.log('');
  console.log('💡 Bu bilgileri aldıktan sonra script\'i tekrar çalıştırın.');
} else {
  quickHealthCheck();
}
