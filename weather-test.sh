#!/bin/bash

# MCP Weather Tool Test Script

echo "🌤️  MCP Hava Durumu Test"
echo "========================"

# İstanbul
echo "📍 İstanbul hava durumu:"
curl -s -X POST http://localhost:4000/sse \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "getWeather",
      "arguments": {
        "latitude": 41.0082,
        "longitude": 28.9784
      }
    }
  }' | jq -r '.result.content[0].text // "Hata oluştu"'

echo ""

# Ankara
echo "📍 Ankara hava durumu:"
curl -s -X POST http://localhost:4000/sse \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "getWeather",
      "arguments": {
        "latitude": 39.9334,
        "longitude": 32.8597
      }
    }
  }' | jq -r '.result.content[0].text // "Hata oluştu"'
