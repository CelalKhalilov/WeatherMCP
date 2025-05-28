import fetch from 'node-fetch';

async function quickTest() {
  try {
    console.log('🔍 Hızlı test - Weather API...');
    
    const response = await fetch('http://localhost:8080/api/weather', {
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

    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Hata:', error.message);
  }
}

quickTest();
